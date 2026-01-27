import { apiClient } from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

// features/auth/api/useCurrentUser.ts
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/profile");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchInterval: 4 * 60 * 1000,
  });
};
