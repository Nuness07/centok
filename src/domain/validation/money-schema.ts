import { z } from "zod";

export const currencySchema = z.enum(["ARS", "BRL", "CLP", "COP", "MXN", "PEN", "USD", "USDT"]);

export const moneySchema = z.object({
  amount: z.string().regex(/^\d+(\.\d+)?$/, "Enter a positive amount."),
  currency: currencySchema
});
