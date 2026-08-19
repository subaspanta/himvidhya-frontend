import { Role } from "@/features/auth/types/domain.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shared by every feature that previews an uploaded file's size (Materials,
// Posts attachments).
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function extractErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as { message?: string } | undefined)?.message ||
      error.message
    );
  }
  return fallback;
}

export const hasRole = (userRole: Role, allowedUser?: Role[]) => {
  if (!allowedUser) return true;
  return allowedUser.includes(userRole);
};

// permissions-based checks removed; rely on role-based checks via hasRole
