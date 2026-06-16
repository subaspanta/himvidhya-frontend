import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { logoutUser } from "@/features/auth/api/auth.api"; // <-- Import the API function
import { resetAuthSessionExpiredEmitter } from "@/shared/api/authSessionEvents";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/config/constants";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const router = useRouter();

  const clearClientAuthState = async () => {
    resetAuthSessionExpiredEmitter();
    await queryClient.cancelQueries({ queryKey: QUERY_KEYS.currentUser });
    queryClient.removeQueries({ queryKey: QUERY_KEYS.currentUser });
    clearUser();
  };

  return useMutation({
    onMutate: async () => {
      await clearClientAuthState();
      router.replace("/");
    },
    mutationFn: async () => {
      await logoutUser();
      return;
    },
    onSuccess: async () => {
      toast.success("Logout successful!");
    },
    onError: async (error: AxiosError<{ message?: string }>) => {
      console.error("Logout failed on server:", error?.response?.data || error.message);
      toast.success("Logout successful!");
    },
  });
};
