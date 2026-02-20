import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";
import { User } from "../types/auth.types";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const authChecked = useAuthStore((state) => state.authChecked);

  const query = useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !authChecked, // Only fetch if auth not checked
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    select: (user) => {
      // Map backend data to store-friendly format
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || "guest", // default role
      };
    },
  });

  // Side-effect: update Zustand store
  if (!authChecked) {
    if (query.data) {
      setUser(query.data, query.data.role);
      setAuthChecked(true);
    } else if (query.isError) {
      setUser(null, null);
      setAuthChecked(true);
    }
  }

  return query;
};
