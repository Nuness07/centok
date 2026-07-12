import type { ChartRange, PricePoint } from "@/domain/models";
import { decimal, toPlain } from "@/lib/decimal";
import { supportedAssets } from "./assets";

const pointCounts: Record<ChartRange, number> = {
  LIVE: 80,
  "1D": 96,
  "5D": 110,
  "1M": 124,
  "6M": 138,
  YTD: 148,
  "1Y": 160,
  MAX: 180
};

export function createPriceHistory(symbol: string, range: ChartRange): PricePoint[] {
  const asset = supportedAssets.find((item) => item.symbol === symbol) ?? supportedAssets[0];
  const count = pointCounts[range];
  const latestPrice = decimal(asset.price.amount);
  const direction = asset.changePercentage >= 0 ? 1 : -1;
  const start = new Date("2026-07-10T12:00:00.000Z").getTime();
  const seed = symbol.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  const amplitude = range === "LIVE" || range === "1D" ? 0.085 : range === "5D" || range === "1M" ? 0.14 : 0.22;

  return Array.from({ length: count }, (_, index) => {
    const progress = index / Math.max(count - 1, 1);
    const trendToClose = (progress - 1) * amplitude * 0.42 * direction;
    const rally = gaussian(progress, 0.28, 0.07) * amplitude * 0.78;
    const selloff = gaussian(progress, 0.47, 0.055) * amplitude * -0.92;
    const breakout = gaussian(progress, 0.68, 0.08) * amplitude * 0.66;
    const lateDrop = gaussian(progress, 0.82, 0.045) * amplitude * -0.55;
    const recovery = gaussian(progress, 0.93, 0.05) * amplitude * 0.36;
    const primaryWave = Math.sin(progress * Math.PI * 8 + seed) * amplitude * 0.09;
    const secondaryWave = Math.cos(progress * Math.PI * 19 + seed * 0.4) * amplitude * 0.045;
    const jagged = (((index * 23 + seed) % 13) - 6) * amplitude * 0.011;
    const intradayShock = index % 31 === 0 ? -amplitude * 0.11 : index % 43 === 0 ? amplitude * 0.095 : 0;
    const movement = trendToClose + direction * (rally + selloff + breakout + lateDrop + recovery + primaryWave + secondaryWave + jagged + intradayShock);
    const value = latestPrice.mul(decimal(1).plus(movement));
    return {
      timestamp: new Date(start + index * 60000).toISOString(),
      value: toPlain(value, 4)
    };
  });
}

function gaussian(x: number, center: number, width: number) {
  return Math.exp(-Math.pow(x - center, 2) / (2 * width * width));
}
