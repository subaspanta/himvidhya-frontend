"use client";

import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal") as "login" | "register" | null;

  const openLoginModal = useCallback(() => {
    router.push("/?modal=login");
  }, [router]);

  const openRegisterModal = useCallback(() => {
    router.push("/?modal=register");
  }, [router]);

  const closeModal = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleSwitchToRegister = useCallback(() => {
    router.push("/?modal=register");
  }, [router]);

  const handleSwitchToLogin = useCallback(() => {
    router.push("/?modal=login");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-jet_black-100">
      <AuthModals
        openModal={modal}
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
