export type Currency = "ARS" | "BRL" | "CLP" | "COP" | "MXN" | "PEN" | "USD" | "USDT";

export type Money = {
  amount: string;
  currency: Currency;
};

export function money(amount: string, currency: Currency): Money {
  return { amount, currency };
}
