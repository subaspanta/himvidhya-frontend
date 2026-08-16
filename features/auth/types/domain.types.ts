export type Role = "teacher" | "student";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  isVerified: boolean;
  isActive: boolean;
};
