"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeroSection, LandingFooter, LandingNav } from "@/features/landing";

export default function Home() {
  const router = useRouter();

  const openLoginModal = useCallback(() => {
    router.push("/login");
  }, [router]);

  const openRegisterModal = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav
        onLoginClick={openLoginModal}
        onSignUpClick={openRegisterModal}
      />

      <HeroSection onGetStartedClick={openRegisterModal} />

      <LandingFooter />
    </div>
  );
}
