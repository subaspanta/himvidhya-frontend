import * as yup from "yup";

// 1. Define the User Schema (for validation only)
export const userSchema = yup.object({
  id: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().min(2).required(),
  username: yup.string().required(),
});

// 2. Define the Auth Response Schema
export const authResponseSchema = yup.object({
  user: userSchema.required(),
  token: yup.string().required(),
});
