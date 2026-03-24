export type AuthModal = "login" | "register" | "forgot-password" | null;

export interface AuthModalsProps {
  openModal: AuthModal;
  onCloseModal: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
  onSwitchToForgotPassword?: () => void;
}

export interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}
