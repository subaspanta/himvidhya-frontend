"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { NavLink } from "@/components/navbar/navbar.types";

type Variant = "landing" | "dashboard" | undefined;

/**
 * Return navigation items based on authentication and optional variant.
 * - When `variant === 'dashboard'` return dashboard links always.
 * - When not authenticated return public links.
 * - When authenticated return dashboard links.
 */
export const useNavItems = (variant?: Variant): NavLink[] => {
  const { isAuthenticated } = useAuthStore();

  const PUBLIC: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  const DASHBOARD: NavLink[] = [
    { label: "Home", href: "/home" },
    { label: "My Batches", href: "/home/batches" },
    { label: "Schedule", href: "/home/schedule" },
    { label: "Announcements", href: "/home/announcements" },
  ];

  if (variant === "dashboard") return DASHBOARD;

  if (!isAuthenticated) return PUBLIC;

  return DASHBOARD;
};
// import { useAuthStore } from "@/features/auth/store/auth.store";
// import { hasPermissions, hasRole } from "../utils";
// import { NAV_ITEMS } from "@/features/nav/nav.config";
// import { Permission, Role } from "@/features/auth/types/rbac.types";

// export const useNavItems = () => {
//   const { user, isAuthenticated } = useAuthStore();

//   // Public nav items for unauthenticated users
//   const PUBLIC_ITEMS = [
//     { label: "Home", href: "/" },
//     { label: "Login", href: "/login" },
//     { label: "Register", href: "/register" },
//   ];

//   if (!isAuthenticated) {
//     return PUBLIC_ITEMS;
//   }

//   // Authenticated: filter NAV_ITEMS by role/permission
//   return NAV_ITEMS.filter((item) => {
//     // ✅ Role check
//     if (item.roles && (!user?.role || !hasRole(user.role as Role, item.roles)))
//       return false;

//     // ✅ Permission check
//     if (
//       item.permissions &&
//       !hasPermissions(user!.permissions as Permission[], item.permissions)
//     )
//       return false;

//     return true;
//   });
// };
