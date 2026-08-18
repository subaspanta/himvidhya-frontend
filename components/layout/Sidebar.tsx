"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogOut, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { useLogout } from "@/features/auth/hooks/useLogout";

interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Home", href: "/home", icon: Home },
];

interface SidebarProps {
  className?: string;
  /** Called right after a nav link is clicked or logout is triggered —
   * lets the mobile drawer close itself without Sidebar knowing about it. */
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        "shrink-0 w-60 bg-sidebar border-r border-sidebar-border flex flex-col py-6 px-3 gap-1",
        className,
      )}
    >
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-accent-subtle hover:text-accent-subtle-foreground",
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          logout();
        }}
        disabled={isLoggingOut}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent-subtle hover:text-accent-subtle-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        {isLoggingOut ? "Logging out..." : "Log Out"}
      </button>
    </aside>
  );
}
