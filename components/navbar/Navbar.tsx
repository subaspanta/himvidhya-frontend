"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getNavbarTheme } from "./navbar.theme";
import { cn } from "@/shared/utils";
import { AuthenticatedProps, NavbarBaseProps, NavLink } from "./navbar.types";
import { useNavItems } from "@/shared/hooks/useNavItems";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { computeNavLinks, createDefaultActions } from "./navbar.utils";
import { useMemo } from "react";
import { LandingNavbarContent } from "./sections/LandingNavbarContent";
import { DashboardNavbarContent } from "./sections/DashboardNavbarContent";

export const Navbar: React.FC<NavbarBaseProps> = ({
  variant,
  navLinks: customLinks,
  className,

  onLogoutClick: onLogoutClickProp,
  onSettingsClick: onSettingsClickProp,
  onNotificationClick: onNotificationClickProp,
  onLoginClick: onLoginClickProp,
  onSignUpClick: onSignUpClickProp,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, authChecked } = useAuthStore();
  const { mutate: logout } = useLogout();
  const theme = getNavbarTheme(variant ?? "dashboard");
  const searchParams = useSearchParams();

  const navItems = useNavItems(variant);

  const navLinks: NavLink[] = useMemo(
    () => computeNavLinks(pathname, customLinks, navItems),
    [pathname, customLinks, navItems],
  );
  const setAuthQuery = (mode: "login" | "register") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("auth", mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const { defaultLogout, defaultSettings, defaultNotification } =
    createDefaultActions(router, logout);

  const isLoggedIn = authChecked && isAuthenticated;
  const userDropdownProps: AuthenticatedProps | null = isLoggedIn
    ? {
        isLoggedIn: true,
        onLogoutClick: onLogoutClickProp ?? defaultLogout,
        onSettingsClick: onSettingsClickProp ?? defaultSettings,
        onNotificationClick: onNotificationClickProp ?? defaultNotification,
        userEmail: user?.email ?? "",
        userName: user?.name ?? "User",
        avatarUrl: user?.avatar ?? undefined,
        notificationCount: 0,
      }
    : null;

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
        {!isLoggedIn || variant === "landing" ? (
          <LandingNavbarContent
            isLoggedIn={isLoggedIn}
            variant={variant}
            userDropdownProps={userDropdownProps}
            onLoginClick={() => setAuthQuery("login")}
            onRegisterClick={() => setAuthQuery("register")}
          />
        ) : (
          <DashboardNavbarContent
            isLoggedIn={isLoggedIn}
            variant={variant}
            navLinks={navLinks}
            theme={theme}
            userDropdownProps={userDropdownProps}
          />
        )}
      </nav>
    </>
  );
};
