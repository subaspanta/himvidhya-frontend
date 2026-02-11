"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setAuthChecked } = useAuthStore();
  const { data: response, isLoading, refetch } = useCurrentUser();

  useEffect(() => {
    console.debug("[auth] AuthProvider state", {
      isLoading,
      hasResponse: !!response,
    });

    if (isLoading) return;

    if (response) {
      console.debug("[auth] AuthProvider: syncing user to Zustand", response);
      setUser(response);
    } else {
      console.debug("[auth] AuthProvider: clearing user from Zustand");
      setUser(null);
    }
    setAuthChecked(true);
  }, [isLoading, response, setUser, setAuthChecked]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage") {
        refetch();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refetch]);

  return <>{children}</>;
}
