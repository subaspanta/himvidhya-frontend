"use client";

import { usePathname, useRouter } from "next/navigation";
import { getNavbarTheme } from "./navbar.theme";
import { cn } from "@/shared/utils";
import { NavbarLogo } from "./NavbarLogo";
import { AuthenticatedProps, NavbarProps, NavLink } from "./navbar.types";
import { useNavItems } from "@/shared/hooks/useNavItems";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarUserDropdown } from "./NavbarUserDropdown";
import { computeNavLinks, createDefaultActions } from "./navbar.utils";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import NavbarBottomTabs from "./NavbarBottomTabs";

export const Navbar: React.FC<NavbarProps> = ({
  variant = "dashboard",
  navLinks: customLinks,
  className,
  onLogoutClick: onLogoutClickProp,
  onSettingsClick: onSettingsClickProp,
  onNotificationClick: onNotificationClickProp,
}) => {
  // Hooks
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const theme = getNavbarTheme(variant);

  // Prepare nav links (active state) — use centralized hook
  const navItems = useNavItems(variant);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks: NavLink[] = useMemo(
    () => computeNavLinks(pathname, customLinks, navItems),
    [pathname, customLinks, navItems],
  );

  // Default action handlers (extracted)
  const { defaultLogout, defaultSettings, defaultNotification } =
    createDefaultActions(router, logout);

  // Auth actions props
  const isLoggedIn = isAuthenticated;
  const userDropdownProps: AuthenticatedProps | null = isLoggedIn
    ? {
        isLoggedIn: true,
        onLogoutClick: onLogoutClickProp ?? defaultLogout,
        onSettingsClick: onSettingsClickProp ?? defaultSettings,
        onNotificationClick: onNotificationClickProp ?? defaultNotification,
        userEmail: user?.email ?? "",
        userName: user?.name ?? "User",
        avatarUrl: user?.avatar ?? undefined,
        notificationCount: 0, // TODO: Wire actual notification count once feature is implemented
      }
    : null;

  // Render
  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={cn(
          "sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 w-full flex justify-between items-center border-b",
          theme.nav,
          className,
        )}
      >
        {/* TODO: Finalize UX rules for authenticated users on `landing` variant to avoid mixed landing/dashboard behavior. */}
        {!isLoggedIn || variant === "landing" ? (
          <div className="flex items-center justify-between w-full">
            <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />

            <div className="flex items-center gap-6">
              <NavbarLinks links={navLinks} theme={theme} />
              {userDropdownProps && (
                <NavbarUserDropdown {...userDropdownProps} />
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-16">
              <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />
              <NavbarLinks links={navLinks} theme={theme} />
            </div>

            <div className="relative w-full sm:w-80 md:w-96 rounded-full overflow-hidden">
              {/* TODO: Wire searchQuery to actual dashboard search/filter state once feature is implemented */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search batches, students..."
                className="pl-10 h-11 bg-card border-border focus:ring-1 focus:ring-primary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* TODO: Add a mobile-friendly user actions menu (logout/settings/notifications) since NavbarUserDropdown is hidden below md. */}
            {userDropdownProps && <NavbarUserDropdown {...userDropdownProps} />}
          </>
        )}
      </nav>
      {/* TODO: Re-enable bottom tabs (or alternative mobile nav) so authenticated users have primary navigation on small screens. */}
      {/* <NavbarBottomTabs links={navLinks} /> */}
    </>
  );
};
