/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/apiClient";
import { UseAuthReturn } from "../types";

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

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { message } = await forgotPassword(email);
      setSuccess(true);
      return { success: true, message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to send OTP";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (email: string, otp: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { valid, message } = await verifyOTP(email, otp);
      setSuccess(valid);
      return { success: true, valid, message };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "Invalid or expired OTP";
      setError(errorMessage);
      return { success: false, valid: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (
    email: string,
    otp: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { user } = await resetPassword(email, otp, password);
      setUser(user); // Auto-login after reset
      setSuccess(true);
      return { success: true, user };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        "Failed to reset password. OTP may be expired.";
      setError(errorMessage);
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
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
    handleForgotPassword,
    handleVerifyOTP,
    handleResetPassword,
  };
};
