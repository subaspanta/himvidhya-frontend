import { User } from "./domain.types";

export type AuthModal = "login" | "register" | "forgot-password" | null;

export type AuthNavigation = {
  toLogin: () => void;
  toRegister: () => void;
  toForgotPassword: () => void;
  close: () => void;
};
export interface AuthModalsProps {
  openModal: AuthModal;
  navigation: AuthNavigation;
  onSuccess?: (userData?: User) => void;
}
export interface LoginFormProps {
  onSuccess?: () => void;
  navigation: AuthNavigation;
}
export interface RegisterFormProps {
  onSuccess?: () => void;
  navigation: AuthNavigation;
}

export interface ForgotPasswordFormProps {
  navigation: AuthNavigation;
}
