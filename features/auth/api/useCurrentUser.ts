import { apiClient } from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      console.debug("[auth] fetch current user");
      const { data } = await apiClient.get("/auth/me");
      console.debug("[auth] current user response", { hasUser: !!data });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchInterval: 4 * 60 * 1000,
  });
};
