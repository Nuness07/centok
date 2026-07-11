import { z } from "zod";
import { moneySchema } from "./money-schema";

export const fundingQuoteRequestSchema = z.object({
  sourceAmount: moneySchema.refine((money) => money.currency === "BRL", "Funding starts from BRL."),
  destinationCurrency: z.literal("USDT"),
  paymentMethod: z.literal("PIX")
});

export const fundingAmountSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a BRL amount.")
});
