import type { Money, OrderQuote } from "@/domain/models";
import { InsufficientBalanceError } from "@/domain/errors/domain-errors";
import { decimal, toFixed, toPlain } from "@/lib/decimal";
import { minutesFromNow } from "@/lib/date";
import { referenceId } from "@/lib/identifiers";

export function calculateOrderQuote(input: {
  assetId: string;
  investmentAmount: Money;
  assetPrice: Money;
  availableBalance: Money;
  index?: number;
}): OrderQuote {
  const investment = decimal(input.investmentAmount.amount);
  const price = decimal(input.assetPrice.amount);
  const executionFee = investment.mul("0.005");
  const total = investment.plus(executionFee);
  const balance = decimal(input.availableBalance.amount);

  if (total.greaterThan(balance)) {
    throw new InsufficientBalanceError();
  }

  return {
    id: referenceId("order-quote", input.index ?? 1),
    assetId: input.assetId,
    investmentAmount: { amount: toFixed(investment, 2), currency: "USDT" },
    estimatedQuantity: toPlain(investment.div(price), 8),
    assetPrice: input.assetPrice,
    executionFee: { amount: toFixed(executionFee, 2), currency: "USDT" },
    total: { amount: toFixed(total, 2), currency: "USDT" },
    remainingBalance: { amount: toFixed(balance.minus(total), 2), currency: "USDT" },
    expiresAt: minutesFromNow(3)
  };
}

export function calculateRemainingBalance(balance: Money, total: Money): Money {
  return { amount: toFixed(decimal(balance.amount).minus(total.amount), 2), currency: balance.currency };
}
