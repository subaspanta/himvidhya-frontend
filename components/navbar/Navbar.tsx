"use client";

import { usePathname, useRouter } from "next/navigation";
import { getNavbarTheme } from "../layout/navbar/navbar.theme";
import { cn } from "@/shared/utils";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarProps, NavLink } from "../layout/navbar/navbar.types";
import { useNavItems } from "@/shared/hooks/useNavItems";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import toast from "react-hot-toast";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarAuthActions";

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
  const navItems = useNavItems();
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const theme = getNavbarTheme(variant);

  // Prepare nav links (active state)
  const navLinks: NavLink[] =
    navLinksOverride?.length && navLinksOverride.length > 0
      ? navLinksOverride
      : navItems.map((item) => ({
          label: item.label,
          href: item.href,
          active: pathname === item.href,
        }));

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
        "relative w-full px-6 py-4 flex justify-between items-center border-b",
        theme.nav,
        className,
      )}
    >
      {/* Logo */}
      <NavbarLogo isLoggedIn={isLoggedIn} variant={variant} />

      {/* Navigation Links */}
      <NavbarLinks links={navLinks} theme={theme} />

      {/* Auth/User Actions */}
      <NavbarActions {...actionProps} theme={theme} />
    </nav>
  );
};
