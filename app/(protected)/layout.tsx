"use client";

import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Sidebar } from "@/components/layout/Sidebar";

// Dashboard layout: full-width content. RightAside is owned by pages that need it.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex flex-1 min-h-0">
        <Sidebar className="hidden lg:flex" />
        <main className="flex-1 min-w-0 max-w-[1440px] w-full mx-auto">
          <div className="p-4 md:p-6 lg:p-8 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
