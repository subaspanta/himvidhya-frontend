"use client";

import { PageLoader } from "@/shared/loading/PageLoader";
import { useAuthStore } from "../store/auth.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PROTECTED_PREFIXES, PUBLIC_PATHS } from "@/config/constants";
import type { Role } from "../types/domain.types";

const isProtectedPath = (pathname: string): boolean =>
  PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const resolveHomeForRole = (role: Role): string => {
  if (role === "teacher") return "/home/teacher";
  if (role === "student") return "/home/student";
  return "/home/student";
};

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const authChecked = useAuthStore((s) => s.authChecked);
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return;

    // 1. Not authenticated → block protected
    if (!user && isProtectedPath(pathname)) {
      const query = searchParams.toString();
      const requestedPath = query ? `${pathname}?${query}` : pathname;
      const redirectParam = encodeURIComponent(requestedPath);
      router.replace(`/login?redirect=${redirectParam}`);
      return;
    }

    // 2. Authenticated → block public pages
    if (user && PUBLIC_PATHS.has(pathname)) {
      router.replace(resolveHomeForRole(user.role));
      return;
    }

    // 3. Role-based routing
    if (user) {
      const correctHome = resolveHomeForRole(user.role);

      if (pathname === "/home") {
        router.replace(correctHome);
        return;
      }

      if (pathname.startsWith("/home/teacher") && user.role === "student") {
        router.replace("/home/student");
        return;
      }

      if (pathname.startsWith("/home/student") && user.role === "teacher") {
        router.replace("/home/teacher");
        return;
      }
    }
  }, [authChecked, user, pathname, router, searchParams]);

  if (!authChecked) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
