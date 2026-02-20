import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { logoutUser } from "@/features/auth/api/auth.api"; // <-- Import the API function

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await logoutUser();
      return;
    },
    onSuccess: () => {
      // ✅ Clear global auth state
      clearUser();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Logout failed:", error?.response?.data || error.message);
    },
  });
};
