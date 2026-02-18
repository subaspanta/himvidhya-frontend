"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LayoutContextType = {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const STORAGE_KEY = "layout-preferences";

function getInitialViewMode(): "grid" | "list" {
  if (typeof window === "undefined") return "grid";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.viewMode === "list" ? "list" : "grid";
    }
  } catch (error) {
    console.error("Failed to load layout preferences:", error);
  }
  return "grid";
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(getInitialViewMode);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ viewMode }));
    } catch (error) {
      console.error("Failed to save layout preferences:", error);
    }
  }, [viewMode]);

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
