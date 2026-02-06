import { z } from "zod";

// 1. Define the User Schema (for validation only)
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  username: z.string().optional(),
});

// 2. Define the Auth Response Schema
export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});
