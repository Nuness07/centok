import type { FundingQuote } from "@/domain/models";

export const sampleFundingQuote: FundingQuote = {
  id: "funding-quote-0001",
  sourceAmount: { amount: "500.00", currency: "BRL" },
  destinationAmount: { amount: "93.40", currency: "USDT" },
  exchangeRate: "5.30",
  fee: { amount: "5.00", currency: "BRL" },
  paymentMethod: "PIX",
  expiresAt: "2026-07-10T18:05:00.000Z"
};
