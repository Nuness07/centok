import type { ChartRange, PricePoint } from "@/domain/models";

export type ChartAdapterProps = {
  points: PricePoint[];
  range: ChartRange;
  positive: boolean;
};
