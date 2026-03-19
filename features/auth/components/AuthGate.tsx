"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { PageLoader } from "@/shared/loading/PageLoader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_PATHS = new Set(["/", "/login", "/register", "/forgot-password"]);
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

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const authChecked = useAuthStore((s) => s.authChecked);
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const router = useRouter();

  const onPublicPath = PUBLIC_PATHS.has(pathname);
  const onProtectedPath = isProtectedPath(pathname);

  useEffect(() => {
    if (!authChecked) return;

    if (!user && onProtectedPath) {
      window.location.replace("/login");
      return;
    }

    if (user && onPublicPath && pathname !== "/") {
      router.replace("/home");
    }
  }, [authChecked, user, onProtectedPath, onPublicPath, pathname, router]);

  if (!authChecked && onProtectedPath) {
    return <PageLoader />;
  }

  if (authChecked && !user && onProtectedPath) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
