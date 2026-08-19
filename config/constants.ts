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

  // Posts
  classPosts: (classId: string) => ["classPosts", classId],

  // Comments
  postComments: (postId: string) => ["postComments", postId],

  // Materials
  // No q -> ["classMaterials", classId], a true prefix of every q-variant
  // below it, so invalidating without q clears all search variants too.
  classMaterials: (classId: string, q?: string) =>
    q ? ["classMaterials", classId, q] : ["classMaterials", classId],
};

export const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-password",
]);
export const PROTECTED_PREFIXES = ["/home"];
