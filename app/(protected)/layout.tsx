"use client";

import React from "react";
import { Footer } from "@/features/landing";
import { AppHeader } from "@/components/layout/AppHeader";
import { Sidebar } from "@/components/layout/Sidebar";

// The two-column content+RightAside composition used to live here,
// forcing every protected page (including the class page) into a ~60%
// column. Only the teacher dashboard actually needs RightAside (pending
// join requests) — it now owns that composition itself, and every other
// page gets the full content width.
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
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 max-w-[1440px] w-full mx-auto">
            <div className="p-4 md:p-6 lg:p-8 w-full">{children}</div>
          </main>
          <Footer
            variant="dashboard"
            className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8"
          />
        </div>
      </div>
    </div>
  );
}
