"use client";

import React from "react";
import { Footer } from "@/features/landing";
import { Navbar } from "@/components/navbar";
import RightAside from "@/components/layout/RightAside";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        className="container mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8"
        variant="dashboard"
      />
      <main className="container mx-auto max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8 w-full">
          <div className="w-full lg:flex-1 min-w-0 lg:pr-6 border-r-0 lg:border-r border-border">
            {children}
          </div>
          <RightAside />
        </div>
      </main>
      <Footer
        variant="dashboard"
        className="container mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8"
      />
    </div>
  );
}
