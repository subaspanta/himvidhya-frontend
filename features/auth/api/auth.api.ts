import { apiClient } from "@/shared/api/axiosClient";
import type { ApiResponse } from "@/shared/types";
import type { User } from "../types/domain.types";
import type {
  RegisterData,
  LoginCredentials,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/api.types";
import { AuthUserDTOSchema, CurrentUserDTOSchema } from "../types/api.schemas";
import { mapAuthUserDTO, mapCurrentUserDTO } from "./auth.mapper";
import { validateDTO } from "@/shared/api/validate";

export const registerUser = async (data: RegisterData): Promise<User> => {
  const response = await apiClient.post("/auth/register", data);
  const validDTO = validateDTO(AuthUserDTOSchema, response.data.user);
  return mapAuthUserDTO(validDTO);
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<User> => {
  const response = await apiClient.post("/auth/login", credentials);
  const validDTO = validateDTO(AuthUserDTOSchema, response.data.user);
  return mapAuthUserDTO(validDTO);
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
  const validDTO = validateDTO(AuthUserDTOSchema, response.data.user);
  return mapAuthUserDTO(validDTO);
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get("/auth/me");
  const validDTO = validateDTO(CurrentUserDTOSchema, response.data);
  return mapCurrentUserDTO(validDTO);
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
