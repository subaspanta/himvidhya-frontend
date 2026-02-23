export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export type GuestProps = {
  isLoggedIn: false;
  onLoginClick: () => void;
  onSignUpClick: () => void;
};

export type AuthenticatedProps = {
  isLoggedIn: true;
  onLogoutClick: () => void;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
  notificationCount?: number;
};

export type NavbarBaseProps = {
  variant?: "landing" | "dashboard";
  /** Optional override; when not provided, links come from useNavItems (RBAC). */
  navLinks?: NavLink[];
  className?: string;
  /** Optional guest overrides (e.g. open modal on landing). */
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  /** Optional authenticated overrides. */
  onLogoutClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
};

export type NavbarProps = NavbarBaseProps;
