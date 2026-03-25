import type { AuthModalsProps } from "../types/ui.types";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const AuthModals = ({ openModal, navigation }: AuthModalsProps) => {
  if (!openModal) return null;

  switch (openModal) {
    case "login":
      return <LoginForm navigation={navigation} />;
    case "register":
      return <RegisterForm navigation={navigation} />;
    case "forgot-password":
      return <ForgotPasswordForm navigation={navigation} />;
    default:
      return null;
  }
};
