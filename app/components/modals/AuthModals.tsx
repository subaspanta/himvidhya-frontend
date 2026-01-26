"use client";

import React from "react";
import { Modal } from "../Modal/Modal";
import { LoginForm } from "../forms/LoginForm";
import { RegisterForm } from "../forms/RegisterForm";

interface AuthModalsProps {
  openModal: "login" | "register" | null;
  onCloseModal: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
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
        isModal={openModal === "login"}
        onModalCross={onCloseModal}
        className="w-96"
      >
        <LoginForm onSwitchToRegister={onSwitchToRegister} />
      </Modal>

      <Modal
        isModal={openModal === "register"}
        onModalCross={onCloseModal}
        className="w-96"
      >
        <RegisterForm onSwitchToLogin={onSwitchToLogin} />
      </Modal>
    </>
  );
};
