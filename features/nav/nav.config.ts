import { Permission, Role } from "@/features/auth/types/rbac.types";

export type NavItem = {
  label: string;
  href: string;
  roles?: Role[];
  permissions?: Permission[];
};

export const NAV_ITEMS: NavItem[] = [
  // 🔐 Authenticated (all roles)
  { label: "Dashboard", href: "/dashboard" },
  { label: "Classes", href: "/classes" },

  // 🎓 Teacher only
  {
    label: "Reports",
    href: "/reports",
    roles: ["teacher"],
  },
  {
    label: "Create Class",
    href: "/class/create",
    permissions: ["CREATE_CLASS"],
  },

  // 💬 Messaging
  {
    label: "Messages",
    href: "/chat",
    permissions: ["SEND_MESSAGE"],
  },

  // 🛠 Admin
  {
    label: "Admin Panel",
    href: "/admin",
    roles: ["admin"],
  },
];
