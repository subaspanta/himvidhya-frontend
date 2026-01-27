/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { registerUser, loginUser } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleRegister: (
    email: string,
    password: string,
    name: string,
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  user: any;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { user, token } = await loginUser({ email, password });

      // Ensure user object includes username property
      setAuth(
        {
          ...user,
          username: user.username ?? user.name ?? user.email, // fallback if username is missing
        },
        token,
      );

      setSuccess(true);
      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await registerUser({ email, password, name });

      // Assuming response.data contains { user, token }
      const { user, token } = response.data;

      // Ensure user object includes username property
      setAuth(
        {
          ...user,
          username: user.username ?? user.name ?? user.email, // fallback if username is missing
        },
        token,
      );

      setSuccess(true);
      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
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
