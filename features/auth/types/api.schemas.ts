import { z } from "zod";

const RoleSchema = z.enum(["teacher", "student"]);

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
  isActive: z.boolean(),
  meta: z.object({
    isVerified: z.boolean(),
  }),
});
