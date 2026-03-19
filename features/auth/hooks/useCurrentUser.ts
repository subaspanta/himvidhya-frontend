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
    enabled: !authChecked,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    select: (user) => {
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
    if (!query.isFetched) return;

    if (query.isSuccess) {
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
    } else if (query.isError) {
      setUser(null, null);
    }

    setAuthChecked(true);
  }, [
    query.isFetched,
    query.isSuccess,
    query.isError,
    query.data,
    setUser,
    setAuthChecked,
  ]);

  return query;
};
