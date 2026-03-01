import { NavLink } from "@/components/navbar";

export interface AppLogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export interface LandingNavProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

type GuestProps = {
  isLoggedIn: false;
  onLoginClick: () => void;
  onSignUpClick: () => void;
};

type AuthenticatedProps = {
  isLoggedIn: true;
  onLogoutClick: () => void;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
  notificationCount?: number;
};
type BaseProps = {
  variant?: "landing" | "dashboard";
  navLinks?: NavLink[];
  className?: string;
};

export type AppNavbarProps = BaseProps & (GuestProps | AuthenticatedProps);
