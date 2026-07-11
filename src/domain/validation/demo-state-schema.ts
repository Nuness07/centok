import { z } from "zod";
import { moneySchema } from "./money-schema";

export const demoScenarioSchema = z.enum([
  "default",
  "funded-user",
  "unfunded-user",
  "failed-login",
  "funding-error",
  "purchase-error",
  "expired-quote",
  "chart-error"
]);

export const demoStateSchema = z.object({
  version: z.number(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    countryCode: z.string(),
    avatarUrl: z.string().optional()
  }),
  authenticatedUserId: z.string().nullable(),
  availableBalance: moneySchema,
  positions: z.array(z.any()),
  transactions: z.array(z.any()),
  scenario: demoScenarioSchema,
  purchaseReturnContext: z
    .object({
      assetSymbol: z.string(),
      amount: z.string().optional()
    })
    .optional()
});
