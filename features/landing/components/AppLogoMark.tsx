import React from "react";

export const AppLogoMark: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 24L10 12L14 17L21 5L29 24H3Z" fill="currentColor" />
  </svg>
);
