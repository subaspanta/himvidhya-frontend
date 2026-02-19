import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./auth.api";

export const useCurrentUser = () => {
  const authChecked = useAuthStore((state) => state.authChecked);

  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    // Always try to fetch on mount since we don't know if cookie exists
    enabled: !authChecked,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
