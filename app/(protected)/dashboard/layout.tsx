"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";
import { LayoutProvider, useLayout } from "@/providers/layout-provider";
import { Navbar } from "@/components/layout";
import { useLogout } from "@/features/auth/hooks/useLogout";
import toast from "react-hot-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Inner layout — consumes LayoutProvider context.
 * Separated so LayoutProvider can wrap this component.
 */
function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { viewMode, setViewMode, notificationCount, setNotificationCount } =
    useLayout();

  // Client-side auth guard (middleware is the primary guard; this is a fallback)
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setViewMode("grid");
  }, [setViewMode]);

  // TODO: Fetch real notification count (replace with real API call later)
  useEffect(() => {
    setNotificationCount(3); // placeholder
  }, [setNotificationCount]);

  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful!");
        router.push("/login");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || error.message || "Logout failed",
        );
      },
    });
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleNotification = () => {
    router.push("/notifications");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        variant="dashboard"
        isLoggedIn={true}
        onLogoutClick={handleLogout}
        onSettingsClick={handleSettings}
        onNotificationClick={handleNotification}
        userEmail={user?.email || "user@example.com"}
        userName={user?.name || "Student"}
        // userRole={user?.role || "student"}
        avatarUrl={user?.avatar}
        notificationCount={notificationCount}
      />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}

/**
 * DashboardLayout — owns the LayoutProvider context.
 * LayoutProvider is dashboard-scoped, not global.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <LayoutProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </LayoutProvider>
  );
}
