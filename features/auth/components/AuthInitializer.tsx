"use client";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

/**
 * AuthInitializer — runs once at the app root.
 *
 * Sole responsibility:
 *  - Trigger the /me query via useCurrentUser
 *  - The hook itself syncs the result into Zustand (setUser / setAuthChecked)
 *
 * Renders nothing — it is a pure side-effect component.
 */
export const AuthInitializer = () => {
  useCurrentUser();
  return null;
};
