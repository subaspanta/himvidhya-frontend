"use client";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useEffect, useRef } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { setUser, setAuthChecked, authChecked } = useAuthStore();
  const updatingFromHere = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    updatingFromHere.current = true;

    if (user) {
      setUser(user);
    } else if (isError) {
      setUser(null);
    }

    if (!authChecked) {
      setAuthChecked(true);
    }

    setTimeout(() => {
      updatingFromHere.current = false;
    }, 100);
  }, [user, isLoading, isError, setUser, setAuthChecked, authChecked]);

  return <>{children}</>;
}
