"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/Modal";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      className="w-96"
      closeButtonClassName="right-6 top-6"
    >
      <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
    </Modal>
  );
}
