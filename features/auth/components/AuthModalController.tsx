"use client";

import { Modal } from "@/components/ui/modal";
import { AuthModals } from "./AuthModals";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AuthModal } from "../types/ui.types";

const isAuthMode = (value: string | null): value is AuthModal =>
  value === "login" || value === "register" || value === "forgot-password";

const sanitizeRedirectPath = (value: string | null): string | null => {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
};

type AuthModalControllerProps = {
  onLoginSuccess?: () => void;
};

export const AuthModalController = ({
  onLoginSuccess,
}: AuthModalControllerProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawMode = searchParams.get("auth");
  const mode: AuthModal | null = isAuthMode(rawMode) ? rawMode : null;
  const isOpen = !!mode;

  const setAuthQuery = (nextMode: AuthModal) => {
    if (!nextMode) return;
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("auth", nextMode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeAuthModal = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.delete("auth");
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const modalNavigation = {
    toLogin: () => setAuthQuery("login"),
    toRegister: () => setAuthQuery("register"),
    toForgotPassword: () => setAuthQuery("forgot-password"),
    close: closeAuthModal,
  };

  const handleLoginSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
      return;
    }

    const redirectPath = sanitizeRedirectPath(searchParams.get("redirect"));

    if (redirectPath) {
      router.push(redirectPath);
      return;
    }

    router.push("/home");
  };

  if (!isOpen || !mode) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={modalNavigation.close}
      className="max-w-lg bg-card border-border w-96"
    >
      <AuthModals
        openModal={mode}
        navigation={modalNavigation}
        onSuccess={handleLoginSuccess}
      />
    </Modal>
  );
};
