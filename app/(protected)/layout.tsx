"use client";

import React from "react";
import { Footer } from "@/features/landing";
import { AppHeader } from "@/components/layout/AppHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import RightAside from "@/components/layout/RightAside";

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
            <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8 w-full">
              <div className="w-full lg:flex-1 min-w-0 lg:pr-6 border-r-0 lg:border-r border-border">
                {children}
              </div>
              <RightAside />
            </div>
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
