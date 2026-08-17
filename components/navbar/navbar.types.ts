export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export type AuthenticatedProps = {
  isLoggedIn: true;
  onLogoutClick: () => void;
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
};

export type NavbarBaseProps = {
  variant: "landing" | "dashboard";
  className?: string;
};
