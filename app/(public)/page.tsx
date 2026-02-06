"use client";

import React, { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { LandingNav } from "./components/LandingNav";
import { HeroSection } from "./components/HeroSection";
import { LandingFooter } from "./components/LandingFooter";

function AuthModalHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal") as
    | "login"
    | "register"
    | "forgot-password"
    | null;

  const closeModal = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleSwitchToRegister = useCallback(() => {
    router.push("/?modal=register");
  }, [router]);

  const handleSwitchToLogin = useCallback(() => {
    router.push("/?modal=login");
  }, [router]);

  const handleSwitchToForgotPassword = useCallback(() => {
    router.push("/?modal=forgot-password");
  }, [router]);

  return (
    <AuthModals
      openModal={modal}
      onCloseModal={closeModal}
      onSwitchToRegister={handleSwitchToRegister}
      onSwitchToLogin={handleSwitchToLogin}
      onSwitchToForgotPassword={handleSwitchToForgotPassword}
    />
  );
}

export default function Home() {
  const router = useRouter();

  const openLoginModal = useCallback(() => {
    router.push("/?modal=login");
  }, [router]);

  const openRegisterModal = useCallback(() => {
    router.push("/?modal=register");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Suspense fallback={null}>
        <AuthModalHandler />
      </Suspense>

      <LandingNav
        onLoginClick={openLoginModal}
        onSignUpClick={openRegisterModal}
      />

      <HeroSection onGetStartedClick={openRegisterModal} />

      <LandingFooter />
    </div>
  );
}
