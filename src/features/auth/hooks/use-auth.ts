"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { useServices } from "@/infrastructure/query/service-provider";
import { authKeys } from "../services/auth-queries";

export function useCurrentUser() {
  const { authService } = useServices();
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: () => authService.getCurrentUser()
  });
}

export function useLoginAsDemoUser() {
  const { authService } = useServices();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.loginAsDemoUser(),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.push(routes.app);
    }
  });
}

export function useStartDefaultDemo() {
  const { authService, demoStateService } = useServices();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await demoStateService.reset();
      return authService.loginAsDemoUser();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.push(routes.app);
    }
  });
}

export function useLogout() {
  const { authService } = useServices();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.push(routes.home);
    }
  });
}
