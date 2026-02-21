"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { PageLoader } from "@/shared/loading/PageLoader";

/**
 * AuthGate — pure UI gating component.
 *
 * Sole responsibility:
 *  - Block the UI with a full-page loader until authChecked is true.
 *  - Does NOT fetch anything.
 *
 * Flow:
 *   authChecked === false  →  show <PageLoader />
 *   authChecked === true   →  render children
 */
export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const authChecked = useAuthStore((s) => s.authChecked);

  if (!authChecked) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
