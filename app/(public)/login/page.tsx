"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/features/landing";
import { Modal } from "@/components/ui/modal";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
  };

  const handleSwitchToRegister = () => {
    router.push("/register");
  };

  const handleSwitchToForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <>
      <HeroSection onGetStartedClick={handleSwitchToRegister} />
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
    </>
  );
}
