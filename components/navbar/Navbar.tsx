"use client";

import { usePathname, useRouter } from "next/navigation";
import { getNavbarTheme } from "./navbar.theme";
import { cn } from "@/shared/utils";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarProps, NavLink } from "./navbar.types";
import { useNavItems } from "@/shared/hooks/useNavItems";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import toast from "react-hot-toast";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarAuthActions";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

export const Navbar: React.FC<NavbarProps> = ({
  variant = "dashboard",
  navLinks: navLinksOverride,
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

  const navLinks: NavLink[] = (() => {
    const isActive = (href: string) => {
      if (!pathname) return false;
      if (href === "/") return pathname === "/";
      return (
        pathname === href ||
        pathname.startsWith(href + "/") ||
        pathname.startsWith(href)
      );
    };

    // If explicit override provided, use it (preserve active state)
    if (navLinksOverride && navLinksOverride.length > 0) {
      return navLinksOverride.map((l) => ({
        ...l,
        active: isActive(l.href),
      }));
    }

    // Use items returned by the hook and mark active state
    return (navItems || []).map((item) => ({
      label: item.label,
      href: item.href,
      active: isActive(item.href),
    }));
  })();

  // Default action handlers
  const defaultLogin = () => router.push("/login");
  const defaultSignUp = () => router.push("/register");
  const defaultLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful!");
        router.push("/login");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || error.message || "Logout failed",
        );
      },
    });
  };
  const defaultSettings = () => router.push("/dashboard");
  const defaultNotification = () => router.push("/dashboard");

  // Auth actions props
  const isLoggedIn = isAuthenticated;
  const actionProps = isLoggedIn
    ? {
        isLoggedIn: true as const,
        onLogoutClick: onLogoutClickProp ?? defaultLogout,
        onSettingsClick: onSettingsClickProp ?? defaultSettings,
        onNotificationClick: onNotificationClickProp ?? defaultNotification,
        userEmail: user?.email ?? "",
        userName: user?.name ?? "User",
        avatarUrl: user?.avatar,
        notificationCount: 0,
      }
    : {
        isLoggedIn: false as const,
        onLoginClick: onLoginClickProp ?? defaultLogin,
        onSignUpClick: onSignUpClickProp ?? defaultSignUp,
      };

  // Render
  return (
    <nav
      className={cn(
        "relative w-full  flex justify-between items-center border-b ",
        theme.nav,
        className,
      )}
    >
      {!isLoggedIn || variant === "landing" ? (
        <div className="flex items-center justify-between w-full">
          <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />

          <div className="flex items-center gap-6">
            <NavbarLinks links={navLinks} theme={theme} />
            <NavbarActions {...actionProps} theme={theme} />
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

          <NavbarActions {...actionProps} theme={theme} />
        </>
      )}
    </nav>
  );
};
