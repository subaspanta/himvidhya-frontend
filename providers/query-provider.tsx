"use client";

import { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: ReactNode }) {
  // Use a lazy initializer for useState to avoid recreating the client on re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30, // Data stays "fresh" for 30 seconds
            refetchOnWindowFocus: false, // Don't refetch just because the user clicked the tab
            retry: 1, // Only retry once if a request fails
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
