import { Role } from "./rbac.types";

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[]; // <-- Add this line
  avatar?: string;
};

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

export type UserRole = "student" | "teacher";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: User };

export type RegisterFormData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export interface AuthModalsProps {
  openModal: "login" | "register" | "forgot-password" | null;
  onCloseModal: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
  onSwitchToForgotPassword?: () => void;
}
export type LoginFormData = {
  email: string;
  password: string;
};

export interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export type AuthStore = {
  user: User | null;
  role: "user" | "admin" | "teacher" | "student" | "guest" | null;
  isAuthenticated: boolean;
  authChecked: boolean;
  setUser: (user: User | null, role?: AuthStore["role"]) => void;
  setAuthChecked: (value: boolean) => void;
  logout: () => void;
};
export interface VerifyOTPPayload {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  valid: boolean;
  message: string;
}
export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}
export type EmailFormData = {
  email: string;
};

export type ResetFormData = {
  otp: string;
  password: string;
  confirmPassword: string;
};

export type Step = "email" | "reset";

export interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}
