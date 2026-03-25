import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";
import type { User } from "../types/domain.types";
import { QUERY_KEYS } from "@/config/constants";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);

  return useQuery<User, Error, User>({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        setAuthChecked(true);
        return user;
      } catch (error) {
        setUser(null);
        setAuthChecked(true);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
