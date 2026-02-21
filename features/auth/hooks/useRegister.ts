import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { registerUser } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { RegisterData } from "../types/auth.types";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: RegisterData) => registerUser(credentials),

    onSuccess: (data) => {
      setUser(data);
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Register failed:", error?.response?.data || error.message);
    },
  });
};
