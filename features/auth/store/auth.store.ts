import { create } from "zustand";
import { apiClient } from "@/lib/api/apiClient";
import Cookies from "js-cookie";

import type { User } from "../types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    Cookies.set("token", token, { expires: 7, sameSite: "strict" });
    // Set axios default header
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove("token");
    delete apiClient.defaults.headers.common["Authorization"];
    set({ user: null, isAuthenticated: false });
  },
}));
