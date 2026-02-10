"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, authChecked, setUser, setAuthChecked } =
    useAuthStore();
  const { data: response, isLoading, error, refetch } = useCurrentUser();

  useEffect(() => {
    console.debug("[auth] AuthProvider state", {
      isLoading,
      authChecked,
      isAuthenticated,
      hasResponse: !!response,
      error,
    });

    if (isLoading) return;

    // Auth check is complete
    if (response) {
      console.debug("[auth] AuthProvider: user resolved", response);
      setUser(response);
      setAuthChecked(true);
    } else {
      console.debug("[auth] AuthProvider: no user, redirecting to login");
      setUser(null);
      setAuthChecked(true);
      router.push("/?modal=login");
    }
  }, [
    isLoading,
    response,
    setUser,
    setAuthChecked,
    router,
    authChecked,
    isAuthenticated,
    error,
  ]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage") {
        refetch();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refetch]);

  console.log("🎯 Current state:", { isAuthenticated, authChecked });

  if (!authChecked) {
    console.log("⏳ Auth not checked yet");
    return null;
  }

  if (!isAuthenticated) {
    console.log("🚫 Not authenticated, should redirect");
    return null;
  }

  console.log("✨ Rendering protected content");
  return <>{children}</>;
}
