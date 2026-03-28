export type AuthSessionExpiredReason =
  | "refresh-token-expired"
  | "refresh-token-failed";

export type AuthSessionExpiredEvent = {
  reason: AuthSessionExpiredReason;
  requestedPath: string | null;
};

type AuthSessionExpiredListener = (event: AuthSessionExpiredEvent) => void;

const listeners = new Set<AuthSessionExpiredListener>();

let emitted = false; // prevent multiple emissions

const resolveRequestedPath = (): string | null => {
  if (typeof window === "undefined") return null;

  const pathname = window.location.pathname || "";
  const search = window.location.search || "";

  return `${pathname}${search}`;
};

export const subscribeAuthSessionExpired = (
  listener: AuthSessionExpiredListener,
): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const emitAuthSessionExpired = (
  reason: AuthSessionExpiredReason,
): void => {
  if (emitted) return;
  emitted = true;

  const event: AuthSessionExpiredEvent = {
    reason,
    requestedPath: resolveRequestedPath(),
  };

  // snapshot to avoid mutation issues during iteration
  [...listeners].forEach((listener) => listener(event));
};
