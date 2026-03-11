import { create } from "zustand";
import { AuthStore } from "../types/auth.types";

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  authChecked: false,

  setUser: (user, role) =>
    set({
      user,
      role: role ?? (user?.role as AuthStore["role"]) ?? null,
      isAuthenticated: !!user,
    }),

  setAuthChecked: (authChecked) => set({ authChecked }),

  logout: () =>
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      authChecked: true,
    }),
}));
