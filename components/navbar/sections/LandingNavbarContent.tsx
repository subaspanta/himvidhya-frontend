"use client";

import { NavbarLogo } from "../NavbarLogo";
import { NavbarUserDropdown } from "../NavbarUserDropdown";
import { AuthenticatedProps, NavbarBaseProps } from "../navbar.types";
import { AuthButtons } from "./AuthButtons";

type Props = {
  isLoggedIn: boolean;
  variant: NavbarBaseProps["variant"];
  userDropdownProps: AuthenticatedProps | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export const LandingNavbarContent: React.FC<Props> = ({
  isLoggedIn,
  variant,
  userDropdownProps,
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />

      <div className="flex items-center gap-6">
        {!isLoggedIn && (
          <AuthButtons
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
          />
        )}
        {userDropdownProps && <NavbarUserDropdown {...userDropdownProps} />}
      </div>
    </div>
  );
};
