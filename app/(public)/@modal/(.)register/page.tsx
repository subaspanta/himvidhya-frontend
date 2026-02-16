"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/Modal";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleSwitchToLogin = () => {
    router.push("/login");
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      className="w-96"
      closeButtonClassName="right-6 top-6"
    >
      <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
    </Modal>
  );
}
