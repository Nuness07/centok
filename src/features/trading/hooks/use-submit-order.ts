"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "@/infrastructure/query/service-provider";

export function useSubmitOrder() {
  const { orderService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) => orderService.submitOrder({ quoteId }),
    onSuccess: () => queryClient.invalidateQueries()
  });
}
