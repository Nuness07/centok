import type { Currency, Money } from "@/domain/models";
import { decimal, toFixed, toPlain } from "@/lib/decimal";

export type InvestmentPreviewRate = {
  exchangeRate: string;
  localFundingFee: string;
};

export type InvestmentPreview = {
  sourceAmount: Money;
  localFundingFee: Money;
  netLocalAmount: Money;
  exchangeRate: string;
  convertedUsdt: Money;
  executionFee: Money;
  investmentAmount: Money;
  assetId: string;
  assetPrice: Money;
  estimatedQuantity: string;
};

export const investmentPreviewRates: Record<Currency, InvestmentPreviewRate> = {
  ARS: { exchangeRate: "1250.00", localFundingFee: "1250.00" },
  BRL: { exchangeRate: "5.30", localFundingFee: "5.00" },
  CLP: { exchangeRate: "950.00", localFundingFee: "950.00" },
  COP: { exchangeRate: "4100.00", localFundingFee: "4100.00" },
  MXN: { exchangeRate: "18.20", localFundingFee: "18.20" },
  PEN: { exchangeRate: "3.75", localFundingFee: "3.75" },
  USD: { exchangeRate: "1.00", localFundingFee: "0.00" },
  USDT: { exchangeRate: "1.00", localFundingFee: "0.00" }
};

export function calculateInvestmentPreview(input: {
  sourceAmount: Money;
  assetId: string;
  assetPrice: Money;
}): InvestmentPreview {
  const rate = investmentPreviewRates[input.sourceAmount.currency];
  const source = decimal(input.sourceAmount.amount);
  const localFundingFee = decimal(rate.localFundingFee);
  const netLocal = DecimalMax(source.minus(localFundingFee), "0");
  const convertedUsdt = netLocal.div(rate.exchangeRate);
  const executionFee = convertedUsdt.mul("0.005");
  const investment = DecimalMax(convertedUsdt.minus(executionFee), "0");
  const price = decimal(input.assetPrice.amount);
  const estimatedQuantity = price.isZero() ? decimal("0") : investment.div(price);

  return {
    sourceAmount: { amount: toFixed(source, 2), currency: input.sourceAmount.currency },
    localFundingFee: { amount: toFixed(localFundingFee, 2), currency: input.sourceAmount.currency },
    netLocalAmount: { amount: toFixed(netLocal, 2), currency: input.sourceAmount.currency },
    exchangeRate: decimal(rate.exchangeRate).toFixed(2),
    convertedUsdt: { amount: toFixed(convertedUsdt, 2), currency: "USDT" },
    executionFee: { amount: toFixed(executionFee, 2), currency: "USDT" },
    investmentAmount: { amount: toFixed(investment, 2), currency: "USDT" },
    assetId: input.assetId,
    assetPrice: input.assetPrice,
    estimatedQuantity: toPlain(estimatedQuantity, 8)
  };
}

export function calculateInvestmentPreviewFromQuantity(input: {
  quantity: string;
  currency: Currency;
  assetId: string;
  assetPrice: Money;
}): InvestmentPreview {
  const rate = investmentPreviewRates[input.currency];
  const quantity = decimal(input.quantity);
  const price = decimal(input.assetPrice.amount);
  const investment = DecimalMax(quantity.mul(price), "0");
  const convertedUsdt = investment.isZero() ? decimal("0") : investment.div("0.995");
  const executionFee = convertedUsdt.mul("0.005");
  const localFundingFee = investment.isZero() ? decimal("0") : decimal(rate.localFundingFee);
  const netLocal = convertedUsdt.mul(rate.exchangeRate);
  const source = netLocal.plus(localFundingFee);

  return {
    sourceAmount: { amount: toFixed(source, 2), currency: input.currency },
    localFundingFee: { amount: toFixed(localFundingFee, 2), currency: input.currency },
    netLocalAmount: { amount: toFixed(netLocal, 2), currency: input.currency },
    exchangeRate: decimal(rate.exchangeRate).toFixed(2),
    convertedUsdt: { amount: toFixed(convertedUsdt, 2), currency: "USDT" },
    executionFee: { amount: toFixed(executionFee, 2), currency: "USDT" },
    investmentAmount: { amount: toFixed(investment, 2), currency: "USDT" },
    assetId: input.assetId,
    assetPrice: input.assetPrice,
    estimatedQuantity: toPlain(quantity, 8)
  };
}

function DecimalMax(value: import("decimal.js").default, min: string) {
  return value.lessThan(min) ? decimal(min) : value;
}
