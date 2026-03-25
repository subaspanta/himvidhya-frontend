import { Role } from "@/features/auth/types/rbac.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasRole = (userRole: Role, allowedUser?: Role[]) => {
  if (!allowedUser) return true;
  return allowedUser.includes(userRole);
};

// permissions-based checks removed; rely on role-based checks via hasRole
