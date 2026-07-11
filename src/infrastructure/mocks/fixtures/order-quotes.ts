import type { OrderQuote } from "@/domain/models";

export const sampleOrderQuote: OrderQuote = {
  id: "order-quote-0001",
  assetId: "asset-aapl",
  investmentAmount: { amount: "80.00", currency: "USDT" },
  estimatedQuantity: "0.37339557",
  assetPrice: { amount: "214.25", currency: "USDT" },
  executionFee: { amount: "0.40", currency: "USDT" },
  total: { amount: "80.40", currency: "USDT" },
  remainingBalance: { amount: "169.60", currency: "USDT" },
  expiresAt: "2026-07-10T18:03:00.000Z"
};
