import { z } from "zod";

// Role is presumably an enum or string literal, we should match it
const RoleSchema = z.enum(["admin", "teacher", "student"]); // Adjust this based on actual roles

export const AuthUserDTOSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema,
  avatar: z.string().nullable(),
  isVerified: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CurrentUserDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  role: RoleSchema,
  meta: z.object({
    isVerified: z.boolean(),
  }),
});
