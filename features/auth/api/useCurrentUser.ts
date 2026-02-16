import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/me");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchInterval: 4 * 60 * 1000,
  });
};
