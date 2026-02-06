import { create } from "zustand";
import { persist } from "zustand/middleware";
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

      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setAuthChecked: (value: boolean) => set({ authChecked: value }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
