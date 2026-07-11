import type { Asset, Money, Portfolio, PortfolioPosition } from "@/domain/models";
import { decimal, toFixed, toPlain } from "@/lib/decimal";

export function calculatePositionAfterPurchase(input: {
  positions: PortfolioPosition[];
  assetId: string;
  quantity: string;
  investmentAmount: Money;
  assetPrice: Money;
  asset: Asset;
}): PortfolioPosition[] {
  const existing = input.positions.find((position) => position.assetId === input.assetId);
  const others = input.positions.filter((position) => position.assetId !== input.assetId);
  const newQuantity = decimal(input.quantity);
  const newInvestment = decimal(input.investmentAmount.amount);

  if (!existing) {
    const currentValue = newQuantity.mul(input.asset.price.amount);
    return [
      ...others,
      {
        assetId: input.assetId,
        quantity: toPlain(newQuantity, 8),
        averagePrice: input.assetPrice,
        currentValue: { amount: toFixed(currentValue, 2), currency: "USDT" },
        unrealizedGain: { amount: "0.00", currency: "USDT" },
        unrealizedGainPercentage: 0
      }
    ];
  }

  const oldQuantity = decimal(existing.quantity);
  const totalQuantity = oldQuantity.plus(newQuantity);
  const oldCost = oldQuantity.mul(existing.averagePrice.amount);
  const newCost = oldCost.plus(newInvestment);
  const averagePrice = newCost.div(totalQuantity);
  const currentValue = totalQuantity.mul(input.asset.price.amount);
  const gain = currentValue.minus(newCost);
  const gainPercentage = newCost.isZero() ? 0 : Number(gain.div(newCost).mul(100).toFixed(2));

  return [
    ...others,
    {
      assetId: input.assetId,
      quantity: toPlain(totalQuantity, 8),
      averagePrice: { amount: toFixed(averagePrice, 2), currency: "USDT" },
      currentValue: { amount: toFixed(currentValue, 2), currency: "USDT" },
      unrealizedGain: { amount: toFixed(gain, 2), currency: "USDT" },
      unrealizedGainPercentage: gainPercentage
    }
  ];
}

export function calculatePortfolioValue(input: {
  availableBalance: Money;
  positions: PortfolioPosition[];
}): Portfolio {
  const invested = input.positions.reduce(
    (sum, position) => sum.plus(decimal(position.averagePrice.amount).mul(position.quantity)),
    decimal(0)
  );
  const current = input.positions.reduce(
    (sum, position) => sum.plus(position.currentValue.amount),
    decimal(0)
  );
  const gain = current.minus(invested);
  const gainPercentage = invested.isZero() ? 0 : Number(gain.div(invested).mul(100).toFixed(2));

  return {
    availableBalance: input.availableBalance,
    totalInvested: { amount: toFixed(invested, 2), currency: "USDT" },
    currentValue: { amount: toFixed(current, 2), currency: "USDT" },
    totalGain: { amount: toFixed(gain, 2), currency: "USDT" },
    totalGainPercentage: gainPercentage,
    positions: input.positions
  };
}

export function calculateUnrealizedGain(currentValue: Money, costBasis: Money): Money {
  return { amount: toFixed(decimal(currentValue.amount).minus(costBasis.amount), 2), currency: currentValue.currency };
}
