import React from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { LandingNavProps } from "../types";

export const LandingNav: React.FC<LandingNavProps> = ({
  onLoginClick,
  onSignUpClick,
}) => {
  return (
    <AppNavbar
      isLoggedIn={false}
      onLoginClick={onLoginClick}
      onSignUpClick={onSignUpClick}
    />
  );
};
