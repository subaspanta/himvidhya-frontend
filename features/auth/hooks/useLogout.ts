import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { logoutUser } from "@/features/auth/api/auth.api"; // <-- Import the API function
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/config/constants";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const router = useRouter(); // Next.js router instead of window.location

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
      router.replace("/login"); // Use router.replace to prevent going back
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Logout failed:", error?.response?.data || error.message);
    },
  });
};
