"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/features/landing";
import { AuthModals } from "./AuthModals";
import type { AuthModal } from "../types/ui.types";

type Props = {
  mode: AuthModal;
};

export const AuthPageShell = ({ mode }: Props) => {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
  };

  const goTo = (target: AuthModal) => {
    if (!target) return;
    router.replace(`/${target}`);
  };

  return (
    <>
      <HeroSection onGetStartedClick={() => goTo("register")} />
      <AuthModals
        openModal={mode}
        onCloseModal={handleClose}
        onSwitchToLogin={() => goTo("login")}
        onSwitchToRegister={() => goTo("register")}
        onSwitchToForgotPassword={() => goTo("forgot-password")}
      />
    </>
  );
};
