import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { resetAuthSessionExpiredEmitter } from "@/shared/api/authSessionEvents";
import { QUERY_KEYS } from "@/config/constants";
import type { LoginCredentials } from "../types/api.types";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),

    onSuccess: (data) => {
      resetAuthSessionExpiredEmitter();
      setUser(data);
      queryClient.setQueryData(QUERY_KEYS.currentUser, data);
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Login failed:", error?.response?.data || error.message);
    },
  });
};
