import { AppLogo } from "@/features/landing";
import Link from "next/link";

export const NavbarLogo = ({
  isLoggedIn,
  variant,
}: {
  isLoggedIn: boolean;
  variant: "landing" | "dashboard";
}) => (
  <Link
    href={isLoggedIn ? "/home" : "/"}
    className="flex items-center hover:opacity-90 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <AppLogo size="lg" variant={variant} />
  </Link>
);
