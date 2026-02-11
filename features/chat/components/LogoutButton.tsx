"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import IconButton from "@/components/icons/IconButton";
import Icon from "@/components/icons";

interface LogoutButtonProps {
  className?: string;
  variant?: "ghost" | "primary" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
}

export default function LogoutButton({
  className = "",
  variant = "danger",
  size = "md",
  showLabel = false,
}: LogoutButtonProps) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      logout();
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (showLabel) {
    return (
      <button
        onClick={handleLogout}
        className={className}
        aria-label="Logout"
        title="Logout"
        disabled={isLoggingOut}
      >
        <Icon name="logout" size="lg" />
        <span className="text-[10px] font-medium leading-tight">
          {isLoggingOut ? "Logging out…" : "Logout"}
        </span>
      </button>
    );
  }

  return (
    <IconButton
      icon="logout"
      size={size}
      variant={variant}
      onClick={handleLogout}
      disabled={isLoggingOut}
      isLoading={isLoggingOut}
      ariaLabel={isLoggingOut ? "Logging out..." : "Logout"}
      className={className}
    />
  );
}
