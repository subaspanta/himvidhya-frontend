"use client";

import Link from "next/link";
import React from "react";
import { NavLink } from "./navbar.types";
import { Home, Calendar, BookOpen, Grid, User } from "lucide-react";
import { cn } from "@/shared/utils";

const IconFor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("home")) return Home;
  if (l.includes("schedule") || l.includes("calendar")) return Calendar;
  if (l.includes("class") || l.includes("batch") || l.includes("classes"))
    return BookOpen;
  if (l.includes("app") || l.includes("apps") || l.includes("dashboard"))
    return Grid;
  if (l.includes("profile") || l.includes("user")) return User;
  return Home;
};

export const NavbarMobileTabs: React.FC<{ links: NavLink[] }> = ({ links }) => {
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[min(720px,calc(100%-32px))] md:hidden z-50">
      <div className="bg-card border border-border rounded-2xl shadow-md flex justify-between items-center px-3 py-2">
        {links.map((link) => {
          const Icon = IconFor(link.label);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center text-xs px-2 py-1 rounded-md transition-colors",
                link.active
                  ? "text-blue-600 bg-blue-100"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="leading-none">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavbarMobileTabs;
