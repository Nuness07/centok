import type { Money } from "./money";

export type FundingQuote = {
  id: string;
  sourceAmount: Money;
  destinationAmount: Money;
  exchangeRate: string;
  fee: Money;
  paymentMethod: "PIX";
  expiresAt: string;
};

export type OrderQuote = {
  id: string;
  assetId: string;
  investmentAmount: Money;
  estimatedQuantity: string;
  assetPrice: Money;
  executionFee: Money;
  total: Money;
  remainingBalance: Money;
  expiresAt: string;
};
