"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { useState } from "react";

type Props = {
  className?: string;
};

export default function LogoutButton({ className }: Props) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      logout(); // clears token + axios header
      router.push("/"); // redirect to home instead of /login
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
      aria-label="Logout"
      title="Logout"
      disabled={isLoggingOut}
    >
      <span className="text-lg">🚪</span>
      <span className="text-[10px] font-medium leading-tight">
        {isLoggingOut ? "Logging out…" : "Logout"}
      </span>
    </button>
  );
}
