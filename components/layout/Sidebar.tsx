"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Archive, Home, LogOut, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  className?: string;
  /** Called right after a nav link is clicked or logout is triggered —
   * lets the mobile drawer close itself without Sidebar knowing about it. */
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = useAuthStore((s) => s.role);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const homeBase = role === "teacher" ? "/home/teacher" : "/home/student";

  const navItems: SidebarNavItem[] = [
    { label: "Home", href: homeBase, icon: Home },
    {
      label: "Archived Class",
      href: `${homeBase}?status=archived`,
      icon: Archive,
    },
  ];

  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        "shrink-0 w-60 bg-sidebar border-r border-sidebar-border flex flex-col py-6 px-3 gap-1",
        className,
      )}
    >
      {navItems.map((item) => {
        const isArchivedItem = item.href.includes("status=archived");
        const isArchivedView = searchParams.get("status") === "archived";
        const isActive =
          pathname === homeBase && isArchivedItem === isArchivedView;
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
        className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent-subtle hover:text-accent-subtle-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        {isLoggingOut ? "Logging out..." : "Log Out"}
      </button>
    </aside>
  );
}
