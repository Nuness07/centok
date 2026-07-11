"use client";

import { useQuery } from "@tanstack/react-query";
import type { ChartRange } from "@/domain/models";
import { useServices } from "@/infrastructure/query/service-provider";

export const assetKeys = {
  all: ["assets"] as const,
  detail: (symbol: string) => ["assets", symbol] as const,
  history: (symbol: string, range: ChartRange) => ["assets", symbol, "history", range] as const
};

export function useAssets() {
  const { assetRepository } = useServices();
  return useQuery({ queryKey: assetKeys.all, queryFn: () => assetRepository.listAssets() });
}

export function usePriceHistory(symbol: string, range: ChartRange) {
  const { assetRepository } = useServices();
  return useQuery({
    queryKey: assetKeys.history(symbol, range),
    queryFn: () => assetRepository.getPriceHistory(symbol, range)
  });
}
