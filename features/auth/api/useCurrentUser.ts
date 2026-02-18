import { apiClient } from "@/shared/api/apiClient";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const authChecked = useAuthStore((state) => state.authChecked);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/me");
      return data;
    },
    // Always try to fetch on mount since we don't know if cookie exists
    enabled: !authChecked,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
