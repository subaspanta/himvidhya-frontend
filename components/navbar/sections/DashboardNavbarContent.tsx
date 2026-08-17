"use client";

import { NavbarLogo } from "../NavbarLogo";
import { NavbarLinks } from "../NavbarLinks";
import { NavbarUserDropdown } from "../NavbarUserDropdown";
import { AuthenticatedProps, NavbarBaseProps, NavLink } from "../navbar.types";

type Props = {
  isLoggedIn: boolean;
  variant: NavbarBaseProps["variant"];
  navLinks: NavLink[];
  theme: React.ComponentProps<typeof NavbarLinks>["theme"];
  userDropdownProps: AuthenticatedProps | null;
};

export const DashboardNavbarContent: React.FC<Props> = ({
  isLoggedIn,
  variant,
  navLinks,
  theme,
  userDropdownProps,
}) => {
  return (
    <>
      <div className="flex items-center gap-16">
        <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />
        <NavbarLinks links={navLinks} theme={theme} />
      </div>

      {userDropdownProps && <NavbarUserDropdown {...userDropdownProps} />}
    </>
  );
};
