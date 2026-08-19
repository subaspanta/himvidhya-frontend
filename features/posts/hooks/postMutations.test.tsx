import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useCreatePost } from "./useCreatePost";
import { useUpdatePost } from "./useUpdatePost";
import { useDeletePost } from "./useDeletePost";
import { usePinPost } from "./usePinPost";
import { useUnpinPost } from "./useUnpinPost";
import type { Post } from "../types";

const createPostApi = vi.fn();
const updatePostApi = vi.fn();
const deletePostApi = vi.fn();
const pinPostApi = vi.fn();
const unpinPostApi = vi.fn();

vi.mock("../api/posts.api", () => ({
  createPostApi: (...args: unknown[]) => createPostApi(...args),
  updatePostApi: (...args: unknown[]) => updatePostApi(...args),
  deletePostApi: (...args: unknown[]) => deletePostApi(...args),
  pinPostApi: (...args: unknown[]) => pinPostApi(...args),
  unpinPostApi: (...args: unknown[]) => unpinPostApi(...args),
}));

const post: Post = {
  id: "post-1",
  title: "Title",
  content: "Content",
  classId: "class-1",
  authorId: {
    _id: "user-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
  isPinned: false,
  deletedAt: null,
  attachments: [],
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
};

let queryClient: QueryClient;
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

beforeEach(() => {
  createPostApi.mockReset();
  updatePostApi.mockReset();
  deletePostApi.mockReset();
  pinPostApi.mockReset();
  unpinPostApi.mockReset();
  queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  vi.spyOn(queryClient, "invalidateQueries");
});

describe("useCreatePost", () => {
  it("calls createPostApi with classId and payload, then invalidates the class's feed", async () => {
    createPostApi.mockResolvedValueOnce(post);
    const { result } = renderHook(() => useCreatePost("class-1"), { wrapper });

    result.current.mutate({ title: "Title", content: "Content" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(createPostApi).toHaveBeenCalledWith("class-1", {
      title: "Title",
      content: "Content",
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["classPosts", "class-1"],
    });
  });
});

describe("useUpdatePost", () => {
  it("calls updatePostApi with postId and payload, then invalidates the class's feed", async () => {
    updatePostApi.mockResolvedValueOnce(post);
    const { result } = renderHook(() => useUpdatePost("class-1"), { wrapper });

    result.current.mutate({ postId: "post-1", data: { title: "New" } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(updatePostApi).toHaveBeenCalledWith("post-1", { title: "New" });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["classPosts", "class-1"],
    });
  });
});

describe("useDeletePost", () => {
  it("calls deletePostApi with postId, then invalidates the class's feed", async () => {
    deletePostApi.mockResolvedValueOnce(post);
    const { result } = renderHook(() => useDeletePost("class-1"), { wrapper });

    result.current.mutate("post-1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(deletePostApi).toHaveBeenCalledWith("post-1");
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["classPosts", "class-1"],
    });
  });
});

describe("usePinPost", () => {
  it("calls pinPostApi with postId, then invalidates the class's feed", async () => {
    pinPostApi.mockResolvedValueOnce(post);
    const { result } = renderHook(() => usePinPost("class-1"), { wrapper });

    result.current.mutate("post-1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(pinPostApi).toHaveBeenCalledWith("post-1");
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["classPosts", "class-1"],
    });
  });
});

describe("useUnpinPost", () => {
  it("calls unpinPostApi with postId, then invalidates the class's feed", async () => {
    unpinPostApi.mockResolvedValueOnce(post);
    const { result } = renderHook(() => useUnpinPost("class-1"), { wrapper });

    result.current.mutate("post-1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(unpinPostApi).toHaveBeenCalledWith("post-1");
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["classPosts", "class-1"],
    });
  });
});
