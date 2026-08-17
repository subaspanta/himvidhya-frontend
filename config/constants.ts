export const QUERY_KEYS = {
  // Auth
  currentUser: ["me"],
  login: ["login"],
  register: ["register"],
  forgotPassword: ["forgotPassword"],
  resetPassword: ["resetPassword"],
  verifyOTP: ["verifyOTP"],

  // Classes
  enrolledClasses: ["enrolledClasses"],
  classById: (id: string) => ["class", id],
  classMembers: (id: string) => ["classMembers", id],

  // Join requests
  joinRequests: ["joinRequests"],
  joinRequestsCount: ["joinRequestsCount"],
};

export const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-password",
]);
export const PROTECTED_PREFIXES = ["/home"];
