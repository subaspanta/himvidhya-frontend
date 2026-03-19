import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { logoutUser } from "@/features/auth/api/auth.api"; // <-- Import the API function
import toast from "react-hot-toast";
import { queryClient } from "@/shared/api/queryClient";
import { QUERY_KEYS } from "@/config/constants";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await logoutUser();
      return;
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.currentUser });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.currentUser });
      clearUser();
      toast.success("Logout successful!");
      window.location.assign("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Logout failed:", error?.response?.data || error.message);
    },
  });
};
