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
    href={isLoggedIn ? "/dashboard" : "/"}
    className="flex items-center hover:opacity-90"
  >
    <AppLogo size="lg" variant={variant} />
  </Link>
);
