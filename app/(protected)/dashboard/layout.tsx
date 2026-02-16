"use client";

import React, { useEffect, useState } from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";
import { useLayout } from "@/providers/layout-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayoutWrapper({
  children,
}: DashboardLayoutProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { viewMode, setViewMode, notificationCount, setNotificationCount } =
    useLayout();

  useEffect(() => {
    setViewMode("grid");
  }, [setViewMode]);

  // TODO: Fetch real notification count (can stay here or move to a hook)
  useEffect(() => {
    // Placeholder — replace with real API call later
    setNotificationCount(3); // example
  }, [setNotificationCount]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleNotification = () => {
    router.push("/notifications");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar
        isLoggedIn={true}
        onLogoutClick={handleLogout}
        onSettingsClick={handleSettings}
        onNotificationClick={handleNotification}
        userEmail={user?.email || "user@example.com"}
        userName={user?.name || "Student"}
        userRole={user?.role || "student"}
        avatarUrl={user?.avatar}
        notificationCount={notificationCount}
      />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
