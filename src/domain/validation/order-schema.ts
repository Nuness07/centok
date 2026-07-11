import { z } from "zod";
import { moneySchema } from "./money-schema";

export const orderQuoteRequestSchema = z.object({
  assetId: z.string().min(1),
  investmentAmount: moneySchema.refine((money) => money.currency === "USDT", "Purchases use the available USDT balance.")
});

export const orderAmountSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount.")
});
