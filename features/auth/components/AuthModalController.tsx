"use client";

import { useRouter } from "next/navigation";
import { AuthModals } from "./AuthModals";
import type { AuthModal } from "../types/ui.types";

type Props = {
  mode: AuthModal;
};

export const AuthModalController = ({ mode }: Props) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const goTo = (target: AuthModal) => {
    if (!target) return;
    router.push(`/${target}`);
  };

  if (!mode) return null;

  return (
    <AuthModals
      openModal={mode}
      onCloseModal={handleClose}
      onSwitchToLogin={() => goTo("login")}
      onSwitchToRegister={() => goTo("register")}
      onSwitchToForgotPassword={() => goTo("forgot-password")}
    />
  );
};
