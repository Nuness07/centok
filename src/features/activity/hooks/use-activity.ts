"use client";

import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/infrastructure/query/service-provider";

export const activityKeys = {
  all: ["activity"] as const
};

export function useActivity() {
  const { activityRepository } = useServices();
  return useQuery({ queryKey: activityKeys.all, queryFn: () => activityRepository.listTransactions() });
}
