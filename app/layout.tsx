import type { Metadata } from "next";
import ToasterProvider from "@/providers/toaster-provider";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import "./globals.css";
import RootProvider from "@/providers/root-provider";
import { AuthQueryModalHost } from "@/features/auth/components/AuthQueryModalHost";

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
          {children}
          <AuthQueryModalHost />
          <div id="modal-root"></div>
        </RootProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
