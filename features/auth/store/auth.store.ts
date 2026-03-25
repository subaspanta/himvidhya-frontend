import { create } from "zustand";
import type { AuthStore } from "../types/store.types";

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  authChecked: false,

  setUser: (user) => {
    set({
      user,
      role: user?.role ?? null,
      isAuthenticated: !!user,
    });
  },

  setAuthChecked: (authChecked) => set({ authChecked }),

  logout: () =>
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      authChecked: true,
    }),
}));
