import React from "react";
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
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-4 md:gap-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground">
          <AppLogo
            size="lg"
            variant={variant === "landing" ? "landing" : "dashboard"}
          />
          <div className="text-[13px]">
            © 2026 HimVidya Education Technologies Pvt. Ltd.
          </div>
        </div>
      </div>
    </footer>
  );
};
