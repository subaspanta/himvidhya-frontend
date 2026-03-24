export type Role = "admin" | "teacher" | "student";

// Clean domain model consumed by store/UI.
// Keep this strict and complete; no API-shape leakage.
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  isVerified: boolean;
  isActive: boolean;
};
