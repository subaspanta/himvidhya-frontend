import React from "react";

interface AppLogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = "sm",
  className = "",
}) => {
  const dimensions = size === "sm" ? "w-10 h-10" : "w-24 h-24";
  const iconSize = size === "sm" ? "w-6 h-6" : "w-14 h-14";
  const borderRadius = size === "sm" ? "rounded-2xl" : "rounded-[32px]";
  const shadow = size === "sm" ? "shadow-lg" : "shadow-2xl";

  return (
    <div
      className={`${dimensions} bg-accent ${borderRadius} flex items-center justify-center ${shadow} ${className}`}
    >
      <svg
        className={`${iconSize} text-accent-foreground`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </div>
  );
};
