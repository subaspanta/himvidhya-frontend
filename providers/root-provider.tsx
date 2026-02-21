const base = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontWeight: 500,
  fontSize: "1rem",
  borderRadius: "0.75rem",
  boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
  padding: "1rem 1.25rem",
  color: "#fff",
};

const accentBorder = (color: string) => ({
  borderLeft: `4px solid ${color}`,
});

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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={10}
        containerStyle={{ marginTop: "1rem" }}
        toastOptions={{
          duration: 4000,

          // ── Default (blank) ──────────────────────────────────────
          style: base,
          className: "himvidya-toast",

          // ── Success ──────────────────────────────────────────────
          success: {
            duration: 3500,
            style: {
              ...base,
              ...accentBorder("#10B981"),
              background: "rgba(6, 30, 22, 0.88)",
            },
            iconTheme: {
              primary: "#10B981",
              secondary: "rgba(16, 185, 129, 0.15)",
            },
          },

          // ── Error ────────────────────────────────────────────────
          error: {
            duration: 5000,
            style: {
              ...base,
              ...accentBorder("#F87171"),
              background: "rgba(30, 8, 8, 0.90)",
            },
            iconTheme: {
              primary: "#F87171",
              secondary: "rgba(248, 113, 113, 0.15)",
            },
          },

          // ── Loading ──────────────────────────────────────────────
          loading: {
            style: {
              ...base,
              ...accentBorder("#818CF8"), // indigo — calm, purposeful
              background: "rgba(12, 12, 28, 0.88)",
            },
            iconTheme: {
              primary: "#818CF8",
              secondary: "rgba(129, 140, 248, 0.15)",
            },
          },
        }}
      />

      {/* 2. DevTools - will only show up in development mode */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
}
