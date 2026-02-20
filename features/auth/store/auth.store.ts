import { create } from "zustand";
import { User } from "../types/auth.types";

type AuthStore = {
  user: User | null;
  role: "user" | "admin" | "teacher" | "student" | "guest" | null;
  isAuthenticated: boolean;
  authChecked: boolean;
  setUser: (user: User | null, role?: AuthStore["role"]) => void;
  setAuthChecked: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  authChecked: false,

  setUser: (user, role) =>
    set({
      user,
      role: role || user?.role || null,
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
