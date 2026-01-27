"use client";

import React, { useState } from "react";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const [openModal, setOpenModal] = useState<"login" | "register" | null>(null);

  const openLoginModal = () => setOpenModal("login");
  const openRegisterModal = () => setOpenModal("register");
  const closeModal = () => setOpenModal(null);

  const handleSwitchToRegister = () => {
    closeModal();
    openRegisterModal();
  };

  const handleSwitchToLogin = () => {
    closeModal();
    openLoginModal();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-jet_black-100">
      <AuthModals
        openModal={openModal}
        onCloseModal={closeModal}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to ChatApp
        </h1>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={openLoginModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Login
          </Button>
          <Button
            onClick={openRegisterModal}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
