import type { Metadata } from "next";
import { Suspense } from "react";
import ToasterProvider from "@/providers/toaster-provider";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import { AuthSessionBoundary } from "@/features/auth/components/AuthSessionBoundary";
import { AuthGate } from "@/features/auth/components/AuthGate";
import "./globals.css";
import RootProvider from "@/providers/root-provider";
import { AuthQueryModalHost } from "@/features/auth/components/AuthQueryModalHost";
import { PageLoader } from "@/shared/loading/PageLoader";

export const metadata: Metadata = {
  title: "HimVidhya",
  description:
    "HimVidhya is a classroom platform for managing batches, learning workflows, and student-teacher collaboration.",
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
        <RootProvider>
          <AuthInitializer />
          <Suspense fallback={null}>
            <AuthSessionBoundary />
          </Suspense>
          <Suspense fallback={<PageLoader />}>
            <AuthGate>{children}</AuthGate>
          </Suspense>
          <Suspense fallback={null}>
            <AuthQueryModalHost />
          </Suspense>
          <div id="modal-root"></div>
        </RootProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
