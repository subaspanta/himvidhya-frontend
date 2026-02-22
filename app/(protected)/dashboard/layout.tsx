"use client";

import React from "react";
import { LayoutProvider } from "@/providers/layout-provider";
import { Navbar } from "@/components/layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
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
