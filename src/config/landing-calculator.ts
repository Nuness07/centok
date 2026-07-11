import type { Currency } from "@/domain/models";

export type LandingPaymentCurrency = Extract<Currency, "ARS" | "BRL" | "CLP" | "COP" | "MXN" | "PEN">;

export const landingCalculatorDefaults = {
  currency: "BRL" as LandingPaymentCurrency,
  amount: "500.00",
  symbol: "AAPL"
};

export const landingPaymentCurrencies: {
  currency: LandingPaymentCurrency;
  name: string;
  defaultAmount: string;
  paymentMethod: string;
}[] = [
  { currency: "BRL", name: "Brazilian real", defaultAmount: "500.00", paymentMethod: "PIX" },
  { currency: "ARS", name: "Argentine peso", defaultAmount: "100000.00", paymentMethod: "CVU/CBU" },
  { currency: "MXN", name: "Mexican peso", defaultAmount: "2000.00", paymentMethod: "SPEI" },
  { currency: "COP", name: "Colombian peso", defaultAmount: "500000.00", paymentMethod: "PSE" },
  { currency: "CLP", name: "Chilean peso", defaultAmount: "100000.00", paymentMethod: "Local transfer" },
  { currency: "PEN", name: "Peruvian sol", defaultAmount: "400.00", paymentMethod: "Local transfer" }
];
