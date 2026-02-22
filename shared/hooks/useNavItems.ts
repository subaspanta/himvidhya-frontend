import { useAuthStore } from "@/features/auth/store/auth.store";
import { hasPermissions, hasRole } from "../utils";
import { NAV_ITEMS } from "@/features/nav/nav.config";
import { Permission, Role } from "@/features/auth/types/rbac.types";

export const useNavItems = () => {
  const { user, isAuthenticated } = useAuthStore();

  // Public nav items for unauthenticated users
  const PUBLIC_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  if (!isAuthenticated) {
    return PUBLIC_ITEMS;
  }

  // Authenticated: filter NAV_ITEMS by role/permission
  return NAV_ITEMS.filter((item) => {
    // ✅ Role check
    if (item.roles && (!user?.role || !hasRole(user.role as Role, item.roles)))
      return false;

    // ✅ Permission check
    if (
      item.permissions &&
      !hasPermissions(user!.permissions as Permission[], item.permissions)
    )
      return false;

    return true;
  });
};
