import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "./providers";

export const metadata: Metadata = {
  title: "ChatApp",
  description: "A modern chat application",
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
          {children}
          <div id="modal-root"></div>
        </AppProviders>
      </body>
    </html>
  );
}
