"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex items-center gap-16">
        <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />
        <NavbarLinks links={navLinks} theme={theme} />
      </div>

      <div className="relative w-full sm:w-80 md:w-96 rounded-full overflow-hidden">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search batches, students..."
          className="pl-10 h-11 bg-card border-border focus:ring-1 focus:ring-primary rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {userDropdownProps && <NavbarUserDropdown {...userDropdownProps} />}
    </>
  );
};
