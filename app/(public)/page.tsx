"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/features/landing";

export default function Home() {
  const router = useRouter();

  const openRegisterModal = useCallback(() => {
    router.push("/register");
  }, [router]);

  return <HeroSection onGetStartedClick={openRegisterModal} />;
}
