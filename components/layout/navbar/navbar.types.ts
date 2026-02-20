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
  navLinks?: NavLink[];
  className?: string;
};

export type NavbarProps = NavbarBaseProps & (GuestProps | AuthenticatedProps);
