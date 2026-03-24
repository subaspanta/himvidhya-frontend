import type { Role, User } from "./domain.types";

export type AuthStore = {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  authChecked: boolean;

  setUser: (user: User | null, role?: Role | null) => void;
  setAuthChecked: (value: boolean) => void;
  logout: () => void;
};
