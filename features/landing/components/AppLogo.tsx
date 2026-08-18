import React from "react";
import Image from "next/image";
import { AppLogoProps } from "../types";
import { cn } from "@/shared/utils";

export const AppLogo: React.FC<
  AppLogoProps & {
    variant?: "landing" | "dashboard";

    tone?: "light" | "dark";
  }
> = ({ size = "sm", className = "", tone = "light" }) => {
  const dimensions = size === "sm" ? "w-32 h-8" : "w-40 h-10";

  return (
    <div
      className={`relative flex items-center gap-2 ${dimensions} ${className}`}
    >
      <div className="relative h-full aspect-square">
        <Image
          src="/Logo.svg"
          alt="HimVidya Logo"
          className="object-contain"
          priority
          fill
          sizes="(max-width: 768px) 32px, 40px"
        />
      </div>
      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          tone === "dark" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        HimVidya
      </span>
    </div>
  );
};
