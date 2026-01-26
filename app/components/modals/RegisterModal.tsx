"use client";

import React from "react";
import { RegisterForm } from "@/app/components/forms/RegisterForm";
import { Modal } from "@/app/components/ui/Modal";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Account"
      className="md:max-w-112.5"
    >
      <div className="py-2">
        <RegisterForm onSuccess={onClose} onSwitchToLogin={onSwitchToLogin} />
      </div>
    </Modal>
  );
};
