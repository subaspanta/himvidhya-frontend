import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AppProviders from "@/providers/root-provider";
import { LayoutProvider } from "@/providers/layout-provider";
import "./globals.css";
// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Note: Satoshi is a custom font. Add it via @font-face in globals.css or use a similar font
// For now, we'll use Inter for headings and can replace with Satoshi later

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <AppProviders>
          <LayoutProvider>{children}</LayoutProvider>
          <div id="modal-root"></div>
        </AppProviders>
      </body>
    </html>
  );
}
