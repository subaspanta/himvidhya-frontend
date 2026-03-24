import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { resetPassword } from "@/features/auth/api/auth.api";
import type { User } from "../types/domain.types";
import type { ResetPasswordPayload } from "../types/api.types";

export const useResetPassword = () => {
  return useMutation<
    User,
    AxiosError<{ message?: string }>,
    ResetPasswordPayload
  >({
    mutationFn: ({ email, otp, password }) =>
      resetPassword(email, otp, password),
    onSuccess: (data) => {
      // Success logic handled in component
    },
    onError: (error) => {
      console.error(
        "Reset password failed:",
        error?.response?.data?.message || error.message,
      );
    },
  });
};
