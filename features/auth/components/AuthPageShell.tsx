"use client";

import { HeroSection } from "@/features/landing";
import { AuthModals } from "./AuthModals";
import type { AuthModal } from "../types/ui.types";
import { useAuthNavigation } from "../hooks/useAuthNavigation";

type Props = { mode: AuthModal };

export const AuthPageShell = ({ mode }: Props) => {
  const { navigation } = useAuthNavigation("page");
  const modalNavigation = {
    toLogin: navigation.goToLogin,
    toRegister: navigation.goToRegister,
    toForgotPassword: navigation.goToForgotPassword,
    close: navigation.close,
  };

  return (
    <>
      <HeroSection onGetStartedClick={navigation.goToRegister} />
      <AuthModals openModal={mode} navigation={modalNavigation} />
    </>
  );
};
