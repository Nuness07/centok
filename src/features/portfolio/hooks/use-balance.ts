"use client";

import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/infrastructure/query/service-provider";

export const balanceKeys = {
  available: ["balance", "available"] as const
};

export function useAvailableBalance() {
  const { balanceRepository } = useServices();
  return useQuery({ queryKey: balanceKeys.available, queryFn: () => balanceRepository.getAvailableBalance() });
}
