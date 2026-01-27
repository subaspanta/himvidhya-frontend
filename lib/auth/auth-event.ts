import { User } from "@/features/auth/types";

export type AuthEvent =
  | { type: "LOGIN"; user: User }
  | { type: "LOGOUT" }
  | { type: "SESSION_EXPIRED" };
