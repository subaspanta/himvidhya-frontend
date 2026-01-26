"use client";

import React from "react";
import { LoginForm } from "@/app/components/forms/LoginForm";
import { Modal } from "@/app/components/ui/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome Back"
      className="md:max-w-112.5"
    >
      <div className="py-2">
        <LoginForm
          onSuccess={onClose}
          onSwitchToRegister={onSwitchToRegister}
        />
      </div>
    </Modal>
  );
};
