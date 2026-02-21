import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { logoutUser } from "@/features/auth/api/auth.api"; // <-- Import the API function
import toast from "react-hot-toast";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await logoutUser();
      return;
    },
    onSuccess: () => {
      clearUser();
      toast.success("Logout successful!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Logout failed:", error?.response?.data || error.message);
    },
  });
};
