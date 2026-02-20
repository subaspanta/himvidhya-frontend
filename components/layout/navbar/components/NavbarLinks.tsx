import { cn } from "@/shared/utils";
import Link from "next/link";
import { NavLink } from "../navbar.types";

export const NavbarLinks = ({
  links,
  theme,
}: {
  links: NavLink[];
  theme: {
    text: string;
    [key: string]: string;
  };
}) => (
  <div className="hidden md:flex items-center gap-6">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "text-sm font-medium transition-colors",
          theme.text,
          link.active && "text-blue-600",
        )}
      >
        {link.label}
      </Link>
    ))}
  </div>
);
