import { cn } from "@/shared/utils";
import Link from "next/link";
import { NavLink } from "./navbar.types";

export const NavbarLinks = ({
  links,
  theme,
}: {
  links: NavLink[];
  theme: {
    text?: string;
    link?: string;
    linkActive?: string;
    [key: string]: string | undefined;
  };
}) => (
  <div className="hidden md:flex items-center gap-2">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "text-sm font-medium transition-colors px-3 py-2 rounded-md",
          // base link styles (hover behaviour included)
          theme.link ?? theme.text,
          // active state: blue text + blue-100 bg for dashboard
          link.active && theme.linkActive,
        )}
      >
        {link.label}
      </Link>
    ))}
  </div>
);
