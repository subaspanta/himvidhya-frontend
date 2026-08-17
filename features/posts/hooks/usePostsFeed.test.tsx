import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { usePostsFeed } from "./usePostsFeed";
import type { PostsPage } from "../types";

const listPostsFeedApi = vi.fn();
vi.mock("../api/posts.api", () => ({
  listPostsFeedApi: (...args: unknown[]) => listPostsFeedApi(...args),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const page1: PostsPage = {
  posts: [
    {
      id: "post-1",
      title: "First",
      content: "Hello",
      classId: "class-1",
      authorId: "user-1",
      isPinned: false,
      deletedAt: null,
      createdAt: "2026-08-17T00:00:00.000Z",
      updatedAt: "2026-08-17T00:00:00.000Z",
    },
  ],
  meta: { nextCursor: "cursor-1", hasMore: true },
};

const page2: PostsPage = {
  posts: [
    {
      id: "post-2",
      title: "Second",
      content: "World",
      classId: "class-1",
      authorId: "user-1",
      isPinned: false,
      deletedAt: null,
      createdAt: "2026-08-16T00:00:00.000Z",
      updatedAt: "2026-08-16T00:00:00.000Z",
    },
  ],
  meta: { nextCursor: null, hasMore: false },
};

describe("usePostsFeed", () => {
  beforeEach(() => {
    listPostsFeedApi.mockReset();
  });

  it("fetches the first page for the given classId", async () => {
    listPostsFeedApi.mockResolvedValueOnce(page1);

    const { result } = renderHook(() => usePostsFeed("class-1"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(listPostsFeedApi).toHaveBeenCalledWith("class-1", { cursor: undefined });
    expect(result.current.data?.pages[0]).toEqual(page1);
  });

  it("fetches the next page using the previous page's nextCursor, and stops when hasMore is false", async () => {
    listPostsFeedApi.mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);

    const { result } = renderHook(() => usePostsFeed("class-1"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(true);

    await result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));
    expect(listPostsFeedApi).toHaveBeenLastCalledWith("class-1", {
      cursor: "cursor-1",
    });
    expect(result.current.hasNextPage).toBe(false);
  });
});
