"use client";

import React from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Modal } from "@/components/ui/Modal";

interface AuthModalsProps {
  openModal: "login" | "register" | null;
  onCloseModal?: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToLogin?: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  openModal,
  onCloseModal,
  onSwitchToRegister,
  onSwitchToLogin,
}) => {
  return (
    <>
      <Modal
        isOpen={openModal === "login"}
        onClose={onCloseModal ?? (() => {})}
        className="w-96"
        closeButtonClassName="right-6 top-6"
      >
        <LoginForm onSwitchToRegister={onSwitchToRegister} />
      </Modal>

      <Modal
        isOpen={openModal === "register"}
        onClose={onCloseModal ?? (() => {})}
        className="w-96"
        closeButtonClassName="right-6 top-6"
      >
        <RegisterForm onSwitchToLogin={onSwitchToLogin} />
      </Modal>
    </>
  );
};
