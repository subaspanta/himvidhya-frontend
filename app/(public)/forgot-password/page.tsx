"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/features/landing";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Modal } from "@/components/ui/modal";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
  };

  const handleSwitchToRegister = () => {
    router.push("/register");
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
        <ForgotPasswordForm onBackToLogin={() => router.push("/login")} />
      </Modal>
    </>
  );
}
