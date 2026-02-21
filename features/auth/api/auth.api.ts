import { apiClient } from "@/shared/api/axiosClient";
import type { User, RegisterData, LoginCredentials } from "../types/auth.types";

const mapUser = (user: User): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  avatar: user.avatar,
});

export const registerUser = async (data: RegisterData): Promise<User> => {
  const response = await apiClient.post("/auth/register", data);

  const user = response.data.user;

  return mapUser(user);
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<User> => {
  const response = await apiClient.post("/auth/login", credentials);

  const user = response.data.user;

  return mapUser(user);
};

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/auth.types";

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post("/auth/forget-password", payload);
  return { message: response.data.message };
};

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
): Promise<User> => {
  const response = await apiClient.post("/auth/reset-password", {
    email,
    otp,
    password,
  });

  const user = response.data.user;

  return mapUser(user);
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

export const logoutUser = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
