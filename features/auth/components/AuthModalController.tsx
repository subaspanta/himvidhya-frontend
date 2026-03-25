"use client";

import { Modal } from "@/components/ui/modal";
import { AuthModals } from "./AuthModals";
import type { AuthModal } from "../types/ui.types";
import { useAuthNavigation } from "../hooks/useAuthNavigation";

type Props = { mode: AuthModal };

export const AuthModalController = ({ mode }: Props) => {
  const { navigation } = useAuthNavigation("modal");

  if (!mode) return null;

  const modalNavigation = {
    toLogin: navigation.goToLogin,
    toRegister: navigation.goToRegister,
    toForgotPassword: navigation.goToForgotPassword,
    close: navigation.close,
  };

  return (
    <Modal
      isOpen={Boolean(mode)}
      onClose={navigation.close}
      className="max-w-lg bg-card border-border w-96"
    >
      <AuthModals openModal={mode} navigation={modalNavigation} />
    </Modal>
  );
};
