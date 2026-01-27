/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { registerUser, loginUser } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/apiClient";
import { User } from "../types";

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  handleLogin: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; user: User | null }>;
  handleRegister: (
    email: string,
    password: string,
    name: string,
    username: string,
  ) => Promise<{ success: boolean; user: User | null }>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);
  const logoutStore = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { user } = await loginUser({ email, password });
      setUser(user);
      setSuccess(true);
      return { success: true, user };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    username: string,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { user } = await registerUser({ email, password, name, username });

      setUser(user);
      setSuccess(true);
      return { success: true, user };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiClient.post("/auth/logout"); // backend clears cookie
    logoutStore();
    router.push("/");
  };

  return {
    loading,
    error,
    success,
    handleLogin,
    handleRegister,
    logout,
    isAuthenticated,
    user,
  };
};
