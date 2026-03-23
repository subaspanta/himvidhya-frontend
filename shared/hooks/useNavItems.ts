"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { NavLink } from "@/components/navbar/navbar.types";

type Variant = "landing" | "dashboard" | undefined;

export const useNavItems = (variant?: Variant): NavLink[] => {
  const { isAuthenticated } = useAuthStore();

  const PUBLIC: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  const DASHBOARD: NavLink[] = [
    { label: "Home", href: "/home" },
    { label: "My Batches", href: "/batches" },
    { label: "Schedule", href: "/schedule" },
    { label: "Announcements", href: "/announcements" },
  ];

  if (variant === "dashboard") return DASHBOARD;

  if (!isAuthenticated) return PUBLIC;

  return DASHBOARD;
};
