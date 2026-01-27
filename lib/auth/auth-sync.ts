import { useAuthStore } from "@/features/auth/store/auth.store";
import { AuthEvent } from "./auth-event";
import { getQueryClient } from "@/providers/Providers";

export function handleAuthEvent(event: AuthEvent) {
  const { setUser, logout } = useAuthStore.getState();
  const queryClient = getQueryClient();

  switch (event.type) {
    case "LOGIN":
      setUser(event.user);
      queryClient?.invalidateQueries();
      break;

    case "LOGOUT":
    case "SESSION_EXPIRED":
      logout();
      queryClient?.clear();
      break;
  }
}
