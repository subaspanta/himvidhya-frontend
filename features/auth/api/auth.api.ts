import { apiClient } from "@/shared/api/axiosClient";
import type { ApiResponse } from "@/shared/types";
import type { User } from "../types/domain.types";
import type {
  RegisterData,
  LoginCredentials,
  AuthUserDTO,
  CurrentUserDTO,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/api.types";
import { mapAuthUserDTO, mapCurrentUserDTO } from "../types/auth.mapper";

export const registerUser = async (data: RegisterData): Promise<User> => {
  const response = await apiClient.post("/auth/register", data);

  const user = response.data.user as AuthUserDTO;

  return mapAuthUserDTO(user);
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<User> => {
  const response = await apiClient.post("/auth/login", credentials);

  const user = response.data.user as AuthUserDTO;

  return mapAuthUserDTO(user);
};

type ResponseWithMeta = {
  meta?: Pick<ApiResponse<unknown>, "message" | "success"> & {
    timestamp?: string;
  };
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post("/auth/forget-password", payload);
  return {
    message:
      (response as ResponseWithMeta).meta?.message ||
      "If email exists, OTP has been sent",
  };
};

export const verifyOTP = async (
  email: string,
  otp: string,
): Promise<{ valid: boolean; message: string }> => {
  const response = await apiClient.post("/auth/verify-otp", { email, otp });
  return {
    valid: response.data.valid,
    message:
      (response as ResponseWithMeta).meta?.message ||
      "OTP verified successfully",
  };
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

  const user = response.data.user as AuthUserDTO;

  return mapAuthUserDTO(user);
};

// export const getProfile = async (): Promise<User> => {
//   const response = await apiClient.get("/auth/me");

//   const user = response.data;

//   return mapUser(user);
// };

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get("/auth/me");

  const user = response.data as CurrentUserDTO;

  return mapCurrentUserDTO(user);
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
