import { NavLink } from "./navbar.types";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
    return pathname === href || pathname.startsWith(href + "/");
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
  const defaultLogout = () => {
    logout();
  };
  // TODO: Route to a dedicated settings page (or open settings modal) when settings feature is finalized.
  const defaultSettings = () => {};
  // TODO: Replace this redirect fallback with real notifications panel/page navigation.
  const defaultNotification = () => router.push("/home");

  return {
    defaultLogout,
    defaultSettings,
    defaultNotification,
  };
}
