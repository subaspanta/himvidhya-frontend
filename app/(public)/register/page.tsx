"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/features/landing";
import { Modal } from "@/components/ui/modal";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
  };

  const handleSwitchToLogin = () => {
    router.push("/login");
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
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      </Modal>
    </>
  );
}
