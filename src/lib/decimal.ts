import Decimal from "decimal.js";

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

export function decimal(value: Decimal.Value): Decimal {
  return new Decimal(value || 0);
}

export function toFixed(value: Decimal.Value, places = 2): string {
  return decimal(value).toDecimalPlaces(places, Decimal.ROUND_HALF_UP).toFixed(places);
}

export function toPlain(value: Decimal.Value, places = 8): string {
  return decimal(value).toDecimalPlaces(places, Decimal.ROUND_HALF_UP).toString();
}

export function isPositive(value: Decimal.Value): boolean {
  return decimal(value).greaterThan(0);
}
