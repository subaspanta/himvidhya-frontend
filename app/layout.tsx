import type { Metadata } from "next";
import AppProviders from "@/providers/root-provider";
import ToasterProvider from "@/providers/toaster-provider";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import { AuthGate } from "@/features/auth/components/AuthGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "HimVidhya",
  description: "A modern chat application",
  icons: {
    icon: "/HimVidhya.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {/* 1. Triggers /me query & syncs Zustand — renders nothing */}
          <AuthInitializer />
          {/* 2. Blocks UI until authChecked is true */}
          <AuthGate>{children}</AuthGate>
          <div id="modal-root"></div>
        </AppProviders>
        <ToasterProvider />
      </body>
    </html>
  );
}
