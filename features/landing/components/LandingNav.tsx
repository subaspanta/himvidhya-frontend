import React from "react";
import { LandingNavProps } from "../types";
import { Navbar } from "@/components/navbar";

export const LandingNav: React.FC<LandingNavProps> = ({
  onLoginClick,
  onSignUpClick,
}) => (
  <Navbar
    variant="landing"
    onLoginClick={onLoginClick}
    onSignUpClick={onSignUpClick}
  />
);
