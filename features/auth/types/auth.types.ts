export type User = {
  id: string;
  name: string;
  email: string;
  role?: "student" | "teacher" | "admin" | "guest";
  avatar?: string;
};

export type AuthResponse = {
  user: User;
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

export interface UseAuthReturn {
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  handleLogin?: (
    email?: string,
    password?: string,
  ) => Promise<{ success?: boolean; user?: User | null }>;
  handleRegister?: (
    email?: string,
    password?: string,
    name?: string,
    username?: string,
  ) => Promise<{ success?: boolean; user?: User | null }>;
  logout?: () => void;
  isAuthenticated?: boolean;
  user?: User | null;
  handleForgotPassword?: (
    email?: string,
  ) => Promise<{ success?: boolean; message?: string }>;
  handleVerifyOTP?: (
    email?: string,
    otp?: string,
  ) => Promise<{ success?: boolean; valid?: boolean; message?: string }>;
  handleResetPassword?: (
    email?: string,
    otp?: string,
    password?: string,
  ) => Promise<{ success?: boolean; user?: User | null }>;
}
