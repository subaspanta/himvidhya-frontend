import React from "react";
import Image from "next/image";
import { AppLogoProps } from "../types";

export const AppLogo: React.FC<AppLogoProps> = ({
  size = "sm",
  className = "",
}) => {
  const dimensions = size === "sm" ? "w-16 h-16" : "w-24 h-24";

  return (
    <div className={`${dimensions} relative ${className}`}>
      <Image
        src="/Mitva.svg"
        alt="Mitva Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
