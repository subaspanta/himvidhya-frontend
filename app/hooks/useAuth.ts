/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { registerUser, loginUser } from "@/app/services/auth.api";
import { useAuthStore } from "@/app/store/auth.store";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      const response = await loginUser({ email, password });

      // Assuming response.data contains { user, token }
      const { user, token } = response.data;

      // Update global store (which handles cookies)
      setAuth(user, token);

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

      // Update global store
      setAuth(user, token);

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
