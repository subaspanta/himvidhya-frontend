import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { verifyOTP } from "@/features/auth/api/auth.api";
import { VerifyOTPPayload, VerifyOTPResponse } from "../types/auth.types";

export const useVerifyOTP = () => {
  return useMutation<
    VerifyOTPResponse,
    AxiosError<{ message?: string }>,
    VerifyOTPPayload
  >({
    mutationFn: ({ email, otp }) => verifyOTP(email, otp),
    onSuccess: (data) => {
      // Success logic handled in component
    },
    onError: (error) => {
      console.error(
        "Verify OTP failed:",
        error?.response?.data?.message || error.message,
      );
    },
  });
};
