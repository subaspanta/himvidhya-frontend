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
    const responseData = error.response?.data as
      | { message?: string; error?: string }
      | undefined;
    return responseData?.message || responseData?.error || error.message || fallback;
  }
  return fallback;
}

export const hasRole = (userRole: Role, allowedUser?: Role[]) => {
  if (!allowedUser) return true;
  return allowedUser.includes(userRole);
};

const RELATIVE_TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// "3 hours ago", "yesterday", "just now" -- used by comment timestamps.
export function formatRelativeTime(isoDate: string): string {
  const diffSeconds = Math.round((Date.parse(isoDate) - Date.now()) / 1000);

  if (Math.abs(diffSeconds) < 60) return "just now";

  for (const [unit, secondsInUnit] of RELATIVE_TIME_UNITS) {
    if (Math.abs(diffSeconds) >= secondsInUnit) {
      return relativeTimeFormatter.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }

  return relativeTimeFormatter.format(Math.round(diffSeconds / 60), "minute");
}

// permissions-based checks removed; rely on role-based checks via hasRole
