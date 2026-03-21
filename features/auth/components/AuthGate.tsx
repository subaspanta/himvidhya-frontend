"use client";

import { PageLoader } from "@/shared/loading/PageLoader";
import { useAuthStore } from "../store/auth.store";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const authChecked = useAuthStore((s) => s.authChecked);
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const router = useRouter();

  const PUBLIC_PATHS = new Set([
    "/",
    "/login",
    "/register",
    "/forgot-password",
  ]);
  const PROTECTED_PREFIXES = [
    "/home",
    "/batches",
    "/announcements",
    "/materials",
    "/schedule",
  ];

  const isProtectedPath = (pathname: string): boolean =>
    PROTECTED_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );

  const onPublicPath = PUBLIC_PATHS.has(pathname);
  const onProtectedPath = isProtectedPath(pathname);
  // console.log("[AuthGate paths]", { onPublicPath, onProtectedPath });

  useEffect(() => {
    if (!authChecked) return;

    if (!user && onProtectedPath) {
      // console.log("[AuthGate] → redirecting to /login");

      window.location.replace("/login");
      return;
    }

    if (user && onPublicPath) {
      // console.log("[AuthGate] → redirecting to /home");
      router.replace("/home");
    }
  }, [authChecked, user, onProtectedPath, onPublicPath, pathname, router]);

  // ← Show loader until auth is checked on ALL paths
  if (!authChecked) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
