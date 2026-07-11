import { useLogout } from "../hooks/use-auth";

export function useLogoutMutation() {
  return useLogout();
}
