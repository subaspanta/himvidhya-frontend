import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";
import { User } from "../types/auth.types";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/config/constants";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const authChecked = useAuthStore((state) => state.authChecked);

  const query = useQuery<User, Error>({
    queryKey: QUERY_KEYS.currentUser,
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
        role: user.role ?? undefined,
        permissions: user.permissions ?? [],
      };
    },
  });

  useEffect(() => {
    if (query.status === "success") {
      setUser(
        query.data,
        query.data.role as
          | "user"
          | "admin"
          | "teacher"
          | "student"
          | "guest"
          | null
          | undefined,
      );
      setAuthChecked(true);
    }

    if (query.status === "error") {
      setUser(null, null);
      setAuthChecked(true);
    }
  }, [query.status]);

  return query;
};
