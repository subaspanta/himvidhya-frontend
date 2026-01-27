import { create } from "zustand";
import { User } from "../types";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  authChecked: boolean;
  setUser: (user: User | null) => void;
  setAuthChecked: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  authChecked: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setAuthChecked: (value) => set({ authChecked: value }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
