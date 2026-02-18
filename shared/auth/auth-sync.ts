import { useAuthStore } from "@/features/auth/store/auth.store";
import { AuthEvent } from "./auth-event";
import { apiClient } from "../api/apiClient";

let isRedirecting = false;

/**
 * Handles auth events by updating the auth store.
 * Note: Query cache invalidation should be handled by React Query's
 * useCurrentUser hook and mutation callbacks, not here.
 */
export function handleAuthEvent(event: AuthEvent) {
  const { setUser } = useAuthStore.getState();

  switch (event.type) {
    case "LOGIN":
      setUser(event.user);
      isRedirecting = false;
      break;

    case "LOGOUT":
      // Manual logout - call the logout API to clear HTTP-only cookie
      apiClient.post("/auth/logout").finally(() => {
        setUser(null);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      });
      break;

    case "SESSION_EXPIRED":
      // Session expired - just clear state without calling API
      setUser(null);
      // Only redirect if we're on a protected route
      if (typeof window !== "undefined" && !isRedirecting) {
        const currentPath = window.location.pathname;
        const isProtectedRoute =
          currentPath.startsWith("/dashboard") ||
          currentPath.startsWith("/chat") ||
          currentPath.startsWith("/settings");

        if (isProtectedRoute) {
          isRedirecting = true;
          // Use a small delay to allow current requests to complete
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }
      }
      break;
  }
}
