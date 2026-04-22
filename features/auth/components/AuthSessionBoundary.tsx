"use client";

import { PROTECTED_PREFIXES } from "@/config/constants";
import { subscribeAuthSessionExpired } from "@/shared/api/authSessionEvents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";
import { queryClient } from "@/shared/api/queryClient";

const isProtectedPath = (pathname: string): boolean =>
  PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const sanitizeRedirectPath = (value: string | null): string | null => {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
};

const buildLoginModalUrl = (redirectPath: string | null): string => {
  const params = new URLSearchParams();
  params.set("auth", "login");

  if (redirectPath) {
    params.set("redirect", redirectPath);
  }

  return `/?${params.toString()}`;
};

export const AuthSessionBoundary = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const pathnameRef = useRef(pathname);
  const handledRef = useRef(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    return subscribeAuthSessionExpired(({ requestedPath }) => {
      if (handledRef.current) return;
      handledRef.current = true;

      const currentPath = pathnameRef.current;
      const isAuthOpen = searchParams.get("auth") === "login";

      // clear client state here (NOT in transport)
      queryClient.clear();
      logout();

      if (!isProtectedPath(currentPath) || isAuthOpen) {
        return;
      }

      const fallbackPath = currentPath;

      const safeRedirectPath =
        sanitizeRedirectPath(requestedPath) ||
        sanitizeRedirectPath(fallbackPath);

      router.replace(buildLoginModalUrl(safeRedirectPath));
    });
  }, [logout, router, searchParams]);

  return null;
};
