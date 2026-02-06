import { apiClient } from "@/lib/api/apiClient";
import type {
  User,
  AuthResponse,
  RegisterData,
  LoginCredentials,
} from "../types";

/* ================= REGISTER ================= */

export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/register", data);

  const user = response.data.user;

  const mappedUser: User = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };

  return { user: mappedUser };
};

/* ================= LOGIN ================= */

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", credentials);

  const user = response.data.user;

  const mappedUser: User = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };

  return { user: mappedUser };
};

/* ================= FORGOT PASSWORD ================= */

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

/* ================= RESET PASSWORD ================= */

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

  const mappedUser: User = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };

  return { user: mappedUser };
};

/* ================= PROFILE ================= */

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get("/auth/profile");

  const user = response.data;

  return {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };
};
