import React from "react";
import { AppNavbar, NavLink } from "@/components/layout/AppNavbar";
import { LandingNavProps } from "../types";

export const LandingNav: React.FC<LandingNavProps> = ({
  onLoginClick,
  onSignUpClick,
}) => {
  const landingLinks: NavLink[] = [
    // { label: "Features", href: "#features" },
    // { label: "Pricing", href: "#pricing" },
    // { label: "About Us", href: "#about" },
  ];

  return (
    <AppNavbar
      variant="landing"
      navLinks={landingLinks}
      isLoggedIn={false}
      onLoginClick={onLoginClick}
      onSignUpClick={onSignUpClick}
    />
  );
};
