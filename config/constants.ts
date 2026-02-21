export const QUERY_KEYS = {
  currentUser: ["me"],
  login: ["login"],
  register: ["register"],
  forgotPassword: ["forgotPassword"],
  resetPassword: ["resetPassword"],
  verifyOTP: ["verifyOTP"],
  // Add more keys as needed
};

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  INSTRUCTOR: "teacher",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
