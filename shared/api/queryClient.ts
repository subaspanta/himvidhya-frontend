"use client";

import { QueryClient } from "@tanstack/react-query";

// Single instance shared across provider + axios interceptor + logout
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
