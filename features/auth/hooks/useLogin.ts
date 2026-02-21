import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { LoginCredentials } from "../types/auth.types";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),

    onSuccess: (data) => {
      setUser(data);
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Login failed:", error?.response?.data || error.message);
    },
  });
};
