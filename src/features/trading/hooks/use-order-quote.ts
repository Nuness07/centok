"use client";

import { useQuery } from "@tanstack/react-query";
import type { Asset } from "@/domain/models";
import { useServices } from "@/infrastructure/query/service-provider";

export const orderKeys = {
  quote: (assetId: string, amount: string) => ["order", "quote", assetId, amount] as const
};

export function useOrderQuote(asset: Asset | undefined, amount: string, enabled: boolean) {
  const { orderService } = useServices();
  return useQuery({
    queryKey: orderKeys.quote(asset?.id ?? "", amount),
    queryFn: () =>
      orderService.getQuote({
        assetId: asset?.id ?? "",
        investmentAmount: { amount: amount || "0", currency: "USDT" }
      }),
    enabled: enabled && Boolean(asset)
  });
}
