import { useAuthStore } from "@/features/auth/store/auth.store";
import { AuthEvent } from "./auth-event";

/**
 * Handles auth events by updating the auth store.
 * Note: Query cache invalidation should be handled by React Query's
 * useCurrentUser hook and mutation callbacks, not here.
 */
export function handleAuthEvent(event: AuthEvent) {
  const { setUser, logout } = useAuthStore.getState();

  switch (event.type) {
    case "LOGIN":
      setUser(event.user);
      break;

    case "LOGOUT":
    case "SESSION_EXPIRED":
      logout();
      // Trigger a page reload on session expiry for complete state cleanup
      if (event.type === "SESSION_EXPIRED" && typeof window !== "undefined") {
        window.location.href = "/login";
      }
      break;
  }
}
