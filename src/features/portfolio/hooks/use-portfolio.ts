"use client";

import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/infrastructure/query/service-provider";

export const portfolioKeys = {
  current: ["portfolio"] as const
};

export function usePortfolio() {
  const { portfolioRepository } = useServices();
  return useQuery({ queryKey: portfolioKeys.current, queryFn: () => portfolioRepository.getPortfolio() });
}
