"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LayoutContextType = {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

function getInitialViewMode(): "grid" | "list" {
  return "grid";
}

type LayoutProviderProps = {
  children: ReactNode;
};

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(getInitialViewMode);
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
