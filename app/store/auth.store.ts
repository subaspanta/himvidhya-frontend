import { create } from "zustand";
import { apiClient } from "../lib/apiClient"; // adjust path if needed

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
};

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
    localStorage.setItem("auth_token", token);
    set({ user, isAuthenticated: true });

    // Set axios default header
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    set({ user: null, isAuthenticated: false });

    // Clear axios header
    delete apiClient.defaults.headers.common["Authorization"];
  },
}));
