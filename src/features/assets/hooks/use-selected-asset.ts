"use client";

import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/infrastructure/query/service-provider";
import { assetKeys } from "./use-assets";

export function useSelectedAsset(symbol: string) {
  const { assetRepository } = useServices();
  return useQuery({
    queryKey: assetKeys.detail(symbol),
    queryFn: () => assetRepository.getAsset(symbol)
  });
}
