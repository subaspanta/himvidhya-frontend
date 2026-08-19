import React from "react";
import { AppLogoMark } from "./AppLogoMark";
import { AppLogoProps } from "../types";
import { cn } from "@/shared/utils";

export const AppLogo: React.FC<
  AppLogoProps & {
    variant?: "landing" | "dashboard";

    tone?: "light" | "dark";
  }
> = ({ size = "sm", className = "", tone = "light" }) => {
  const dimensions = size === "sm" ? "w-32 h-8" : "w-40 h-10";
  const markDimensions = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <div
      className={`flex items-center gap-2 ${dimensions} ${className}`}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground p-1.5",
          markDimensions,
        )}
      >
        <AppLogoMark className="h-full w-full" />
      </div>
      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          tone === "dark" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        HimVidhya
      </span>
    </div>
  );
};
