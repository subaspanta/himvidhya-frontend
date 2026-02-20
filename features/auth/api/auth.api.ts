import { apiClient } from "@/shared/api/apiClient";
import type {
  User,
  AuthResponse,
  RegisterData,
  LoginCredentials,
} from "../types/auth.types";

const mapUser = (user: User): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
});

export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/register", data);

  const user = response.data.user;

  return { user: mapUser(user) };
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", credentials);

  const user = response.data.user;

  return { user: mapUser(user) };
};

export const forgotPassword = async (
  email: string,
): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/forget-password", { email });
  return { message: response.data.message };
};

/* ================= VERIFY OTP ================= */

export const verifyOTP = async (
  email: string,
  otp: string,
): Promise<{ valid: boolean; message: string }> => {
  const response = await apiClient.post("/auth/verify-otp", { email, otp });
  return { valid: response.data.valid, message: response.data.message };
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/reset-password", {
    email,
    otp,
    password,
  });

  const user = response.data.user;

  return { user: mapUser(user) };
};

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get("/auth/profile");

  const user = response.data;

  return {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
  };
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get("/auth/me");

  const user = response.data;

  return {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
  };
};

/**
 * Logs out the current user.
 * Calls the backend logout endpoint.
 */
export const logoutUser = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
