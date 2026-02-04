"use client";

import Providers from "@/providers/Providers";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
