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
  const { data: response, isLoading, error } = useCurrentUser();

  // Initialize auth state on mount
  useEffect(() => {
    if (isLoading) return;

    // Auth check is complete
    if (response) {
      setUser(response);
      setAuthChecked(true);
    } else {
      setUser(null);
      setAuthChecked(true);
      router.push("/?modal=login");
    }
  }, [isLoading, response, setUser, setAuthChecked, router]);

  // Tab synchronization logic
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage") {
        // If auth storage changed (e.g. logout in another tab)
        // We can either reload or trigger a refetch
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  console.log("🎯 Current state:", { isAuthenticated, authChecked });

  // Show nothing while checking auth
  if (!authChecked) {
    console.log("⏳ Auth not checked yet");
    return null;
  }

  // Show nothing if not authenticated (will redirect above)
  if (!isAuthenticated) {
    console.log("🚫 Not authenticated, should redirect");
    return null;
  }

  // User is authenticated, render protected content
  console.log("✨ Rendering protected content");
  return <>{children}</>;
}
