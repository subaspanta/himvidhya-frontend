"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AppLogo } from "@/features/landing";
import { NavbarUserDropdown } from "@/components/navbar/NavbarUserDropdown";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cn } from "@/shared/utils";

export function AppHeader({ className }: { className?: string }) {
  const { user, isAuthenticated, authChecked } = useAuthStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const isLoggedIn = authChecked && isAuthenticated;

  // Close on route change (Sidebar's own onNavigate covers the click case;
  // this catches back/forward nav too). Adjusting state during render per
  // https://react.dev/learn/you-might-not-need-an-effect — avoids the
  // extra render pass a useEffect(() => setIsDrawerOpen(false), [pathname])
  // would cost.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsDrawerOpen(false);
  }

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDrawerOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full flex items-center justify-between gap-4 px-4 md:px-6 py-3 bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {isLoggedIn && (
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden -ml-1 p-2 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <Link href="/home" className="flex items-center hover:opacity-90">
          <AppLogo size="lg" tone="dark" />
        </Link>
      </div>

      {isLoggedIn && (
        <NavbarUserDropdown
          tone="dark"
          isLoggedIn
          userEmail={user?.email ?? ""}
          userName={user?.name ?? "User"}
          avatarUrl={user?.avatar ?? undefined}
        />
      )}

      {isLoggedIn && isDrawerOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40"
            style={{ background: "var(--overlay)" }}
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden
          />
          <Sidebar
            className="fixed left-0 top-0 h-full z-50 shadow-xl"
            onNavigate={() => setIsDrawerOpen(false)}
          />
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="fixed left-[15.5rem] top-4 z-50 p-2 rounded-md text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
}
