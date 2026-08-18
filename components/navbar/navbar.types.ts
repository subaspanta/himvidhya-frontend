export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export type AuthenticatedProps = {
  isLoggedIn: true;
  // Optional: the sidebar-shell header omits this, since logout lives in
  // the sidebar there instead. The horizontal public-page navbar still
  // passes it.
  onLogoutClick?: () => void;
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
};

export type NavbarBaseProps = {
  variant: "landing" | "dashboard";
  className?: string;
};
