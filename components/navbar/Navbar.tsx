"use client";

import { usePathname, useRouter } from "next/navigation";
import { getNavbarTheme } from "./navbar.theme";
import { cn } from "@/shared/utils";
import { NavbarLogo } from "./NavbarLogo";
import { AuthenticatedProps, NavbarProps, NavLink } from "./navbar.types";
import { useNavItems } from "@/shared/hooks/useNavItems";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import toast from "react-hot-toast";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarUserDropdown } from "./NavbarUserDropdown";
import { computeNavLinks, createDefaultActions } from "./navbar.utils";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

export const Navbar: React.FC<NavbarProps> = ({
  variant = "dashboard",
  navLinks: customLinks,
  className,
  onLoginClick: onLoginClickProp,
  onSignUpClick: onSignUpClickProp,
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

  const navLinks: NavLink[] = computeNavLinks(pathname, customLinks, navItems);

  // Default action handlers (extracted)
  const {
    defaultLogin,
    defaultSignUp,
    defaultLogout,
    defaultSettings,
    defaultNotification,
  } = createDefaultActions(router, logout);

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
        avatarUrl: user?.avatar,
        notificationCount: 0,
      }
    : null;

  // Render
  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 w-full flex justify-between items-center border-b",
          theme.nav,
          className,
        )}
      >
        {!isLoggedIn || variant === "landing" ? (
          <div className="flex items-center justify-between w-full">
            <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />

            <div className="flex items-center gap-6">
              <NavbarLinks links={navLinks} theme={theme} />
              <div className="hidden md:flex">
                {userDropdownProps && (
                  <NavbarUserDropdown {...userDropdownProps} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-16">
              <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />
              <NavbarLinks links={navLinks} theme={theme} />
            </div>

            {isLoggedIn && (
              <div className="relative w-full sm:w-80 md:w-96 rounded-full overflow-hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search batches, students..."
                  className="pl-10 h-11 bg-card border-border focus:ring-1 focus:ring-primary rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            <div className="hidden md:flex">
              {userDropdownProps && (
                <NavbarUserDropdown {...userDropdownProps} />
              )}
            </div>
          </>
        )}
      </nav>
      {/* <NavbarBottomTabs links={navLinks} /> */}
    </>
  );
};
