import { describe, it, expect } from "vitest";
import { apiClient } from "./axiosClient";

// Tests the actual registered interceptor function directly — no mocking
// library in this codebase (no axios-mock-adapter/msw), and going through a
// real network call would test axios, not this file's transform. Axios
// exposes registered handlers at interceptors.response.handlers[n].fulfilled.
const getFulfilledInterceptor = () => {
  const handlers = (
    apiClient.interceptors.response as unknown as {
      handlers: Array<{ fulfilled: (response: unknown) => unknown }>;
    }
  ).handlers;
  const handler = handlers.find((h) => h?.fulfilled);
  if (!handler) throw new Error("No fulfilled response interceptor registered");
  return handler.fulfilled;
};

describe("axiosClient response interceptor — pagination meta", () => {
  it("forwards envelope.meta (nextCursor/hasMore) onto response.meta", () => {
    const fulfilled = getFulfilledInterceptor();

    const rawResponse = {
      data: {
        success: true,
        message: "Posts retrieved successfully",
        timestamp: "2026-08-17T00:00:00.000Z",
        data: { posts: [] },
        meta: { nextCursor: "abc123", hasMore: true },
      },
    };

    const result = fulfilled(rawResponse) as { meta: Record<string, unknown> };

    expect(result.meta.nextCursor).toBe("abc123");
    expect(result.meta.hasMore).toBe(true);
  });

  it("leaves meta.nextCursor/hasMore undefined for a non-paginated envelope", () => {
    const fulfilled = getFulfilledInterceptor();

    const rawResponse = {
      data: {
        success: true,
        message: "OK",
        timestamp: "2026-08-17T00:00:00.000Z",
        data: { user: { id: "u1" } },
      },
    };

    const result = fulfilled(rawResponse) as { meta: Record<string, unknown> };

    expect(result.meta.nextCursor).toBeUndefined();
    expect(result.meta.hasMore).toBeUndefined();
    expect(result.meta.success).toBe(true);
  });
});
