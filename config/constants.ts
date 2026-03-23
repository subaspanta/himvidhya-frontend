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

  // Join requests
  joinRequests: ["joinRequests"],
  joinRequestsCount: ["joinRequestsCount"],
};
