import type { Money } from "./money";

export type AssetStatus = "active" | "unavailable" | "coming-soon";
export type MarketStatus = "open" | "closed" | "available-24-7";

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  logoUrl: string;
  price: Money;
  changeAmount: Money;
  changePercentage: number;
  description: string;
  status: AssetStatus;
  marketStatus: MarketStatus;
};

export type ChartRange = "LIVE" | "1D" | "5D" | "1M" | "6M" | "YTD" | "1Y" | "MAX";

export const chartRanges: ChartRange[] = ["LIVE", "1D", "5D", "1M", "6M", "YTD", "1Y", "MAX"];

export type PricePoint = {
  timestamp: string;
  value: string;
};
