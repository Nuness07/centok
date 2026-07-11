"use client";

import { useQuery } from "@tanstack/react-query";
import type { Money } from "@/domain/models";
import { useServices } from "@/infrastructure/query/service-provider";

export const fundingKeys = {
  quote: (amount: string) => ["funding", "quote", amount] as const
};

export function useFundingQuote(amount: string, enabled: boolean) {
  const { fundingService } = useServices();
  const sourceAmount: Money = { amount: amount || "0", currency: "BRL" };
  return useQuery({
    queryKey: fundingKeys.quote(amount),
    queryFn: () =>
      fundingService.getQuote({
        sourceAmount,
        destinationCurrency: "USDT",
        paymentMethod: "PIX"
      }),
    enabled
  });
}
