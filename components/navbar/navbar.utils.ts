import { NavLink } from "./navbar.types";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Router = { push: (href: string) => void };
type LogoutMutate = UseMutateFunction<
  void,
  AxiosError<{ message?: string }>,
  void,
  unknown
>;

export function computeNavLinks(
  pathname: string | null | undefined,
  navLinksOverride: NavLink[] | undefined,
  navItems: NavLink[] | undefined,
): NavLink[] {
  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return (
      pathname === href ||
      pathname.startsWith(href + "/") ||
      pathname.startsWith(href)
    );
  };

  if (navLinksOverride && navLinksOverride.length > 0) {
    return navLinksOverride.map((l) => ({ ...l, active: isActive(l.href) }));
  }

  return (navItems || []).map((item) => ({
    label: item.label,
    href: item.href,
    active: isActive(item.href),
  }));
}

export function createDefaultActions(router: Router, logout: LogoutMutate) {
  const defaultLogin = () => router.push("/");
  const defaultSignUp = () => router.push("/");
  const defaultLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful!");
        router.push("/");
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        toast.error(
          error?.response?.data?.message || error.message || "Logout failed",
        );
      },
    });
  };
  const defaultSettings = () => router.push("/home");
  const defaultNotification = () => router.push("/home");

  return {
    defaultLogin,
    defaultSignUp,
    defaultLogout,
    defaultSettings,
    defaultNotification,
  };
}
