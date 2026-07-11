"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DemoScenario } from "@/domain/models";
import { useServices } from "@/infrastructure/query/service-provider";

export const demoKeys = {
  scenario: ["demo", "scenario"] as const
};

export function useDemoScenario() {
  const { demoStateService } = useServices();
  return useQuery({ queryKey: demoKeys.scenario, queryFn: () => demoStateService.getScenario() });
}

export function useSetDemoScenario() {
  const { demoStateService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scenario: DemoScenario) => demoStateService.setScenario(scenario),
    onSuccess: () => queryClient.invalidateQueries()
  });
}

export function useResetDemoState() {
  const { demoStateService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => demoStateService.reset(),
    onSuccess: () => queryClient.invalidateQueries()
  });
}
