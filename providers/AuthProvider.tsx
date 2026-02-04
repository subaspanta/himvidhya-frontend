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
  const { data: user, isLoading, error } = useCurrentUser();

  // Initialize auth state on mount
  useEffect(() => {
    if (isLoading) return;

    // Auth check is complete
    if (user) {
      setUser(user);
      setAuthChecked(true);
    } else {
      setUser(null);
      setAuthChecked(true);
      // Redirect to login
      router.push("/?modal=login");
    }
  }, [isLoading, user, setUser, setAuthChecked, router]);

  // Show nothing while checking auth
  if (!authChecked) {
    return null;
  }

  // Show nothing if not authenticated (will redirect above)
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
}
