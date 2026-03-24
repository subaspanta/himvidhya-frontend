import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";
import type { User } from "../types/domain.types";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/config/constants";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);

  const query = useQuery<User, Error, User>({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: getCurrentUser,
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.isFetched) return;

    if (query.isSuccess) {
      setUser(query.data);
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
