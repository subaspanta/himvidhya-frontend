import type { Role } from "./domain.types";

// -------- Request payloads --------
export type RegisterData = {
  email: string;
  password: string;
  name: string;
  role: Role;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  password: string;
};

export type VerifyOTPPayload = {
  email: string;
  otp: string;
};

// -------- Backend DTOs (match backend shape exactly) --------
// /auth/login, /auth/register, /auth/reset-password
export type AuthUserDTO = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// /auth/me
export type CurrentUserDTO = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: Role;
  isActive: boolean;
  meta: {
    isVerified: boolean;
  };
};

// -------- API responses consumed in hooks/components --------
export type ForgotPasswordResponse = {
  message: string;
};

export type VerifyOTPResponse = {
  valid: boolean;
  message: string;
};
