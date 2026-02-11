import React from "react";
import { Button } from "@/components/ui/button";
import { AppLogo } from "./AppLogo";
import { LandingNavProps } from "../types";

export const LandingNav: React.FC<LandingNavProps> = ({
  onLoginClick,
  onSignUpClick,
}) => {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-surface border-b border-border">
      <div className="flex items-center gap-3">
        <AppLogo size="sm" />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={onLoginClick} className="font-medium">
          Login
        </Button>
        <Button onClick={onSignUpClick} size="lg" className="shadow-lg">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};
