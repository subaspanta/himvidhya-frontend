"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getNavbarTheme } from "./navbar.theme";
import { cn } from "@/shared/utils";
import { AuthenticatedProps, NavbarBaseProps, NavLink } from "./navbar.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { LandingNavbarContent } from "./sections/LandingNavbarContent";
import { DashboardNavbarContent } from "./sections/DashboardNavbarContent";

const DASHBOARD_NAV_LINKS: NavLink[] = [{ label: "Home", href: "/home" }];

export const Navbar: React.FC<NavbarBaseProps> = ({ variant, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, authChecked } = useAuthStore();
  const { mutate: logout } = useLogout();
  const theme = getNavbarTheme(variant ?? "dashboard");
  const searchParams = useSearchParams();

  const navLinks: NavLink[] = DASHBOARD_NAV_LINKS.map((link) => ({
    ...link,
    active: pathname === link.href || pathname?.startsWith(`${link.href}/`),
  }));

  const setAuthQuery = (mode: "login" | "register") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("auth", mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isLoggedIn = authChecked && isAuthenticated;
  const userDropdownProps: AuthenticatedProps | null = isLoggedIn
    ? {
        isLoggedIn: true,
        onLogoutClick: () => logout(),
        userEmail: user?.email ?? "",
        userName: user?.name ?? "User",
        avatarUrl: user?.avatar ?? undefined,
      }
    : null;

  return (
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
  );
};
