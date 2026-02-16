import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers/root-provider";
import { LayoutProvider } from "@/providers/layout-provider";

export const metadata: Metadata = {
  title: "Mitva",
  description: "A modern chat application",
  icons: {
    icon: "/Mitva.svg",
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
          <LayoutProvider>{children}</LayoutProvider>
          <div id="modal-root"></div>
        </AppProviders>
      </body>
    </html>
  );
}
