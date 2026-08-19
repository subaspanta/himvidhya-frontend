"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ClassDetails } from "../types";

interface ClassContextValue {
  classDetails: ClassDetails;
  isOwner: boolean;
  isArchived: boolean;
}

const ClassContext = createContext<ClassContextValue | null>(null);

// Populated once by ClassLayoutShell (the class page's shared layout,
// which already fetches classDetails to render the header) so the three
// tab pages don't each re-derive isOwner/isArchived from a second
// useClassDetails call plus their own useAuthStore read.
export function ClassProvider({
  value,
  children,
}: {
  value: ClassContextValue;
  children: ReactNode;
}) {
  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
}

export function useClassContext() {
  const ctx = useContext(ClassContext);
  if (!ctx) {
    throw new Error("useClassContext must be used within a ClassProvider");
  }
  return ctx;
}
