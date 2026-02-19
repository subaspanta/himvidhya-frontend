"use client";

import QueryProvider from "@/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {children}
      {/* 1. Global Toasts for the QueryCache errors */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* 2. DevTools - will only show up in development mode */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
}
