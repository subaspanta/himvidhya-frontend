"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LayoutContextType = {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  // Add more shared layout state later (theme, notifications, etc.)
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <LayoutContext.Provider
      value={{ viewMode, setViewMode, notificationCount, setNotificationCount }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
