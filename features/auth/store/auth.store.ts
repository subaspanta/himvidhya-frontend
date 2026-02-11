import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../types";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  authChecked: boolean;
  setUser: (user: User | null) => void;
  setAuthChecked: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      authChecked: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthChecked: (authChecked) => set({ authChecked }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
