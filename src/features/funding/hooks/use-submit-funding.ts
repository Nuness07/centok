"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "@/infrastructure/query/service-provider";

export function useSubmitFunding() {
  const { fundingService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) => fundingService.submitFunding({ quoteId }),
    onSuccess: () => queryClient.invalidateQueries()
  });
}
