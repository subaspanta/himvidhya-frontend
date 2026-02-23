"use client";

import React from "react";
import { Footer } from "@/features/landing";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        className="container mx-auto max-w-[1440px]  p-4 md:p-6 lg:p-8"
        variant="dashboard"
      />
      <main className="container mx-auto">{children}</main>
      <Footer
        variant="dashboard"
        className="container mx-auto max-w-[1440px]  p-4 md:p-6 lg:p-8"
      />
    </div>
  );
}
