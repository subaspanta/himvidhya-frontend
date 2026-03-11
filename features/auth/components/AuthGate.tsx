"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { PageLoader } from "@/shared/loading/PageLoader";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const authChecked = useAuthStore((s) => s.authChecked);

  if (!authChecked) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
