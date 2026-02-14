export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: "student" | "teacher";
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  handleLogin: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; user: User | null }>;
  handleRegister: (
    email: string,
    password: string,
    name: string,
    username: string,
  ) => Promise<{ success: boolean; user: User | null }>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  handleForgotPassword: (
    email: string,
  ) => Promise<{ success: boolean; message: string }>;
  handleVerifyOTP: (
    email: string,
    otp: string,
  ) => Promise<{ success: boolean; valid: boolean; message: string }>;
  handleResetPassword: (
    email: string,
    otp: string,
    password: string,
  ) => Promise<{ success: boolean; user: User | null }>;
}
