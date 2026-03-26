"use client";

import { Modal } from "@/components/ui/modal";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AuthModal } from "@/features/auth/types/ui.types";

type AuthQueryMode = Exclude<AuthModal, null>;

const isAuthMode = (value: string | null): value is AuthQueryMode =>
  value === "login" || value === "register" || value === "forgot-password";

const sanitizeRedirectPath = (value: string | null): string | null => {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
};

type AuthQueryModalHostProps = {
  onLoginSuccess?: () => void;
};

export const AuthQueryModalHost = ({
  onLoginSuccess,
}: AuthQueryModalHostProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawMode = searchParams.get("auth");
  const mode: AuthQueryMode | null = isAuthMode(rawMode) ? rawMode : null;
  const isOpen = !!mode;

  const setAuthQuery = (nextMode: AuthQueryMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("auth", nextMode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeAuthModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
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
      onClose={closeAuthModal}
      className="max-w-lg bg-card border-border w-96"
    >
      <AuthModals
        openModal={mode}
        onSuccess={handleLoginSuccess}
        navigation={{
          toLogin: () => setAuthQuery("login"),
          toRegister: () => setAuthQuery("register"),
          toForgotPassword: () => setAuthQuery("forgot-password"),
          close: closeAuthModal,
        }}
      />
    </Modal>
  );
};
