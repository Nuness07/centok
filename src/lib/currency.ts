import type { Currency, Money } from "@/domain/models";
import { decimal, toFixed } from "./decimal";

const currencyDisplay: Record<Currency, string> = {
  ARS: "ARS",
  BRL: "BRL",
  CLP: "CLP",
  COP: "COP",
  MXN: "MXN",
  PEN: "PEN",
  USD: "USD",
  USDT: "USDT"
};

export function formatMoney(money: Money, options: { compact?: boolean } = {}): string {
  const places = money.currency === "BRL" || money.currency === "USD" || money.currency === "USDT" ? 2 : 2;
  const amount = Number(toFixed(money.amount, places));

  if (money.currency === "USDT") {
    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: options.compact ? "compact" : "standard"
    }).format(amount)} USDT`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyDisplay[money.currency],
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: options.compact ? "compact" : "standard"
  }).format(amount);
}

export function formatQuantity(value: string): string {
  const qty = decimal(value);
  if (qty.isZero()) return "0";
  return qty.toDecimalPlaces(2).toFixed(2);
}

export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function makeMoney(amount: string, currency: Currency): Money {
  return { amount, currency };
}
