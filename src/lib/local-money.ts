import type { Currency, Money } from "@/domain/models";
import { investmentPreviewRates } from "@/domain/calculations/investment-preview";
import { decimal, toFixed } from "./decimal";

export function currencyForCountry(countryCode?: string): Currency {
  if (countryCode === "BR") return "BRL";
  if (countryCode === "MX") return "MXN";
  if (countryCode === "AR") return "ARS";
  if (countryCode === "CO") return "COP";
  if (countryCode === "CL") return "CLP";
  if (countryCode === "PE") return "PEN";
  return "BRL";
}

export function convertMoneyForDisplay(money: Money, targetCurrency: Currency = "BRL"): Money {
  if (money.currency === targetCurrency) return money;

  if (money.currency === "USDT" || money.currency === "USD") {
    const rate = investmentPreviewRates[targetCurrency]?.exchangeRate ?? "1";
    return {
      amount: toFixed(decimal(money.amount).mul(rate), 2),
      currency: targetCurrency
    };
  }

  if (targetCurrency === "USDT" || targetCurrency === "USD") {
    const rate = investmentPreviewRates[money.currency]?.exchangeRate ?? "1";
    return {
      amount: toFixed(decimal(money.amount).div(rate), 2),
      currency: targetCurrency
    };
  }

  const sourceRate = investmentPreviewRates[money.currency]?.exchangeRate ?? "1";
  const targetRate = investmentPreviewRates[targetCurrency]?.exchangeRate ?? "1";
  return {
    amount: toFixed(decimal(money.amount).div(sourceRate).mul(targetRate), 2),
    currency: targetCurrency
  };
}

export function asUsdtReference(money: Money): Money | null {
  if (money.currency === "USDT") return money;
  if (money.currency === "USD") return { ...money, currency: "USDT" };

  const rate = investmentPreviewRates[money.currency]?.exchangeRate;
  if (!rate) return null;

  return {
    amount: toFixed(decimal(money.amount).div(rate), 2),
    currency: "USDT"
  };
}
