import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { forgotPassword } from "@/features/auth/api/auth.api";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/api.types";

export const useForgetPassword = () => {
  return useMutation<
    ForgotPasswordResponse,
    AxiosError<{ message?: string }>,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPassword,
    onSuccess: () => {
      // Success logic handled in component
    },
    onError: (error) => {
      console.error(
        "Forgot password failed:",
        error?.response?.data || error.message,
      );
    },
  });
};
