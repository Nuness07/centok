"use client";

import type { ChartRange } from "@/domain/models";
import { usePriceHistory } from "@/features/assets/hooks/use-assets";
import { LightweightChartAdapter } from "../adapters/lightweight-chart-adapter";
import { ChartErrorState, ChartLoadingState } from "./chart-state";

export function MarketChart({ symbol, range, positive }: { symbol: string; range: ChartRange; positive: boolean }) {
  const history = usePriceHistory(symbol, range);

  if (history.isLoading) return <ChartLoadingState />;
  if (history.isError || !history.data) return <ChartErrorState onRetry={() => history.refetch()} />;
  return <LightweightChartAdapter points={history.data} range={range} positive={positive} />;
}
