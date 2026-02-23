import React from "react";
import Link from "next/link";
import { AppLogo } from "@/features/landing/components/AppLogo";
import { cn } from "@/shared/utils";
import { getNavbarTheme } from "@/components/navbar/navbar.theme";

export const Footer: React.FC<{
  className?: string;
  variant?: "landing" | "dashboard";
}> = ({ className, variant = "dashboard" }) => {
  const theme = getNavbarTheme(variant);

  return (
    <footer className={cn("w-full px-0 py-6 md:py-8", theme.nav, className)}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <AppLogo
            size="lg"
            variant={variant === "landing" ? "landing" : "dashboard"}
          />
          <div className="text-[13px]">
            © 2026 HimVidya Education Technologies Pvt. Ltd.
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/help"
            className={cn(
              "text-sm transition",
              variant === "landing"
                ? "text-slate-300 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Help Center
          </Link>
          <Link
            href="/privacy"
            className={cn(
              "text-sm transition",
              variant === "landing"
                ? "text-slate-300 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className={cn(
              "text-sm transition",
              variant === "landing"
                ? "text-slate-300 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Terms of Service
          </Link>
          <Link
            href="/feedback"
            className={cn(
              "text-sm transition",
              variant === "landing"
                ? "text-slate-300 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Feedback
          </Link>
        </div>
      </div>
    </footer>
  );
};
