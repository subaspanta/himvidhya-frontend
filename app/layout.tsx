import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers/Providers";
import { AuthProvider } from "./components/Providers/AuthProvider";

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
        <Providers>
          {/* <AuthProvider> */}
          {children}
          <div id="modal-root"></div>
          {/* </AuthProvider> */}
        </Providers>
      </body>
    </html>
  );
}
