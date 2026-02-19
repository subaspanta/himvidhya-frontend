"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleSwitchToRegister = () => {
    router.push("/register");
  };

  const handleSwitchToForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      className="w-96"
      closeButtonClassName="right-6 top-6"
    >
      <LoginForm
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToForgotPassword={handleSwitchToForgotPassword}
      />
    </Modal>
  );
}
