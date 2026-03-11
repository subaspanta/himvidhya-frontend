"use client";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export const AuthInitializer = () => {
  useCurrentUser();
  return null;
};
