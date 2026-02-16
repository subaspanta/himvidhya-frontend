"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";

const isDev = process.env.NODE_ENV === "development";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setAuthChecked } = useAuthStore();
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useCurrentUser();

  useEffect(() => {
    if (isDev) {
      console.debug("[auth] AuthProvider state", {
        isLoading,
        isError,
        hasResponse: !!response,
      });
    }

    if (isLoading) return;

    if (isError) {
      if (isDev) {
        console.error("[auth] AuthProvider: failed to fetch user", error);
      }
      setUser(null);
      setAuthChecked(true);
      return;
    }

    if (response) {
      if (isDev) {
        console.debug("[auth] AuthProvider: syncing user to Zustand", response);
      }
      setUser(response);
    } else {
      if (isDev) {
        console.debug("[auth] AuthProvider: clearing user from Zustand");
      }
      setUser(null);
    }
    setAuthChecked(true);
  }, [isLoading, isError, response, error, setUser, setAuthChecked]);

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
