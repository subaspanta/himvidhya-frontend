"use client";

import React from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Modal } from "@/components/ui/modal";

interface AuthModalsProps {
  openModal: "login" | "register" | "forgot-password" | null;
  onCloseModal: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
  onSwitchToForgotPassword?: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  openModal,
  onCloseModal,
  onSwitchToRegister,
  onSwitchToLogin,
  onSwitchToForgotPassword,
}) => {
  return (
    <>
      <Modal
        isOpen={openModal === "login"}
        onClose={onCloseModal ?? (() => {})}
        className="w-96"
        closeButtonClassName="right-6 top-6"
      >
        <LoginForm
          onSwitchToRegister={onSwitchToRegister}
          onSwitchToForgotPassword={onSwitchToForgotPassword}
        />
      </Modal>

      <Modal
        isOpen={openModal === "register"}
        onClose={onCloseModal ?? (() => {})}
        className="w-96"
        closeButtonClassName="right-6 top-6"
      >
        <RegisterForm onSwitchToLogin={onSwitchToLogin} />
      </Modal>

      <Modal
        isOpen={openModal === "forgot-password"}
        onClose={onCloseModal}
        className="w-96"
        closeButtonClassName="right-6 top-6"
      >
        <ForgotPasswordForm onBackToLogin={onSwitchToLogin} />
      </Modal>
    </>
  );
};
