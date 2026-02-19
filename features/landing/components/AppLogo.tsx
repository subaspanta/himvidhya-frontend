import React from "react";
import Image from "next/image";
import { AppLogoProps } from "../types";
import { cn } from "@/shared/utils";

export const AppLogo: React.FC<
  AppLogoProps & { variant?: "landing" | "dashboard" }
> = ({ size = "sm", className = "", variant = "dashboard" }) => {
  const dimensions = size === "sm" ? "w-32 h-8" : "w-40 h-10";
  const textColor = variant === "landing" ? "text-white" : "text-slate-900";

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
      <span className={cn("text-xl font-bold tracking-tight", textColor)}>
        HimVidya
      </span>
    </div>
  );
};
