import Link from "next/link";
import { NavLink } from "../navbar.types";
import { Button } from "@/components/ui/button";

interface NavbarMobileMenuProps {
  links: NavLink[];
  setOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  userName: string;
}

export const NavbarMobileMenu = ({
  links,
  setOpen,
  isLoggedIn,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
  userName,
}: NavbarMobileMenuProps) => (
  <div className="absolute top-full left-0 w-full bg-white shadow-xl p-4 z-50">
    {links.map((link: NavLink) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setOpen(false)}
        className="block py-2"
      >
        {link.label}
      </Link>
    ))}

    <div className="border-t my-2" />

    {!isLoggedIn ? (
      <>
        <Button onClick={onLoginClick}>Login</Button>
        <Button onClick={onSignUpClick}>Sign Up</Button>
      </>
    ) : (
      <>
        <p className="text-xs">Signed in as {userName}</p>
        <Button onClick={onLogoutClick}>Logout</Button>
      </>
    )}
  </div>
);
