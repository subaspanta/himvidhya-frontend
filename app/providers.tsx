"use client";

import Providers from "@/providers/Providers";
import { AuthProvider } from "@/providers/AuthProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Providers>
  );
}
