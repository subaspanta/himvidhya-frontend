import React from "react";
import { LandingNavProps } from "../types";
import { Navbar, NavLink } from "@/components/layout";

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
    <Navbar
      variant="landing"
      navLinks={landingLinks}
      isLoggedIn={false}
      onLoginClick={onLoginClick}
      onSignUpClick={onSignUpClick}
    />
  );
};
