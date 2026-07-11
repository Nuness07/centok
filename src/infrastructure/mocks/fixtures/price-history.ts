import type { ChartRange, PricePoint } from "@/domain/models";
import { decimal, toPlain } from "@/lib/decimal";
import { supportedAssets } from "./assets";

const pointCounts: Record<ChartRange, number> = {
  LIVE: 24,
  "1D": 28,
  "5D": 32,
  "1M": 36,
  "6M": 42,
  YTD: 44,
  "1Y": 48,
  MAX: 56
};

const rangeDrift: Record<ChartRange, string> = {
  LIVE: "0.001",
  "1D": "0.002",
  "5D": "0.004",
  "1M": "0.006",
  "6M": "0.011",
  YTD: "0.013",
  "1Y": "0.016",
  MAX: "0.022"
};

export function createPriceHistory(symbol: string, range: ChartRange): PricePoint[] {
  const asset = supportedAssets.find((item) => item.symbol === symbol) ?? supportedAssets[0];
  const count = pointCounts[range];
  const drift = decimal(rangeDrift[range]);
  const base = decimal(asset.price.amount).mul(decimal(1).minus(drift.mul(count / 2)));
  const direction = asset.changePercentage >= 0 ? 1 : -1;
  const start = new Date("2026-07-10T12:00:00.000Z").getTime();

  return Array.from({ length: count }, (_, index) => {
    const wave = decimal(((index % 7) - 3) * 0.0018 * direction);
    const trend = drift.mul(index);
    const value = base.mul(decimal(1).plus(trend).plus(wave));
    return {
      timestamp: new Date(start + index * 60000).toISOString(),
      value: toPlain(value, 4)
    };
  });
}
