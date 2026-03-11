import { Permission, Role } from "@/features/auth/types/rbac.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasRole = (userRole: Role, allowedUser?: Role[]) => {
  if (!allowedUser) return true;
  return allowedUser.includes(userRole);
};

export const hasPermissions = (
  userPermissions: Permission[] | undefined,
  required?: Permission[],
) => {
  // No specific permissions required → allow
  if (!required || required.length === 0) return true;

  // Required permissions but user has none → deny
  if (!userPermissions || userPermissions.length === 0) return false;

  return required.every((p) => userPermissions.includes(p));
};
