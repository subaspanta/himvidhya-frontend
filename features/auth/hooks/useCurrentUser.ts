import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";
import type { User } from "../types/domain.types";
import { QUERY_KEYS } from "@/config/constants";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);

  const query = useQuery<User, Error, User>({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: getCurrentUser,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (query.isPending) return;

    if (query.isError) {
      setUser(null);
      setAuthChecked(true);
      return;
    }

    if (query.isSuccess) {
      setUser(query.data ?? null);
      setAuthChecked(true);
    }
  }, [
    query.isPending,
    query.isError,
    query.isSuccess,
    query.data,
    setUser,
    setAuthChecked,
  ]);

  return query;
};
