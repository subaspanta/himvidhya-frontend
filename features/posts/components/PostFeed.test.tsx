import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostFeed } from "./PostFeed";
import type { Post } from "../types";

const fetchNextPage = vi.fn();
let mockReturn: {
  data: { pages: { posts: Post[] }[] } | undefined;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: typeof fetchNextPage;
};

vi.mock("../hooks/usePostsFeed", () => ({
  usePostsFeed: () => mockReturn,
}));

const pinMutate = vi.fn();
const unpinMutate = vi.fn();
vi.mock("../hooks/usePinPost", () => ({
  usePinPost: () => ({ mutate: pinMutate }),
}));
vi.mock("../hooks/useUnpinPost", () => ({
  useUnpinPost: () => ({ mutate: unpinMutate }),
}));

// jsdom has no IntersectionObserver. Capture the registered callback so
// tests can simulate the sentinel entering the viewport.
let ioCallback: IntersectionObserverCallback | null = null;
class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    ioCallback = cb;
  }
  observe() {}
  disconnect() {}
  unobserve() {}
}

const post = (id: string, overrides: Partial<Post> = {}): Post => ({
  id,
  title: `Post ${id}`,
  content: `Content ${id}`,
  classId: "class-1",
  authorId: "user-1",
  isPinned: false,
  deletedAt: null,
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
  ...overrides,
});

describe("PostFeed", () => {
  beforeEach(() => {
    fetchNextPage.mockClear();
    pinMutate.mockClear();
    unpinMutate.mockClear();
    ioCallback = null;
    // @ts-expect-error -- test-only global stub, no IntersectionObserver in jsdom
    global.IntersectionObserver = MockIntersectionObserver;
    mockReturn = {
      data: undefined,
      isLoading: true,
      isError: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage,
    };
  });

  it("shows a loading state while the first page is in flight", () => {
    render(<PostFeed classId="class-1" isOwner={false} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows an error state on failure", () => {
    mockReturn = { ...mockReturn, isLoading: false, isError: true };
    render(<PostFeed classId="class-1" isOwner={false} />);
    expect(screen.getByText(/unable to load posts/i)).toBeInTheDocument();
  });

  it("renders posts from every loaded page without duplicates", () => {
    mockReturn = {
      ...mockReturn,
      isLoading: false,
      data: {
        pages: [
          { posts: [post("1"), post("2")] },
          { posts: [post("3")] },
        ],
      },
    };
    render(<PostFeed classId="class-1" isOwner={false} />);

    expect(screen.getAllByText(/^Post \d$/)).toHaveLength(3);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
  });

  it("shows the correct end-of-feed state when there is no next page", () => {
    mockReturn = {
      ...mockReturn,
      isLoading: false,
      hasNextPage: false,
      data: { pages: [{ posts: [post("1")] }] },
    };
    render(<PostFeed classId="class-1" isOwner={false} />);

    expect(screen.getByText(/you're all caught up/i)).toBeInTheDocument();
  });

  it("fetches the next page when the sentinel intersects", () => {
    mockReturn = {
      ...mockReturn,
      isLoading: false,
      hasNextPage: true,
      isFetchingNextPage: false,
      data: { pages: [{ posts: [post("1")] }] },
    };
    render(<PostFeed classId="class-1" isOwner={false} />);

    expect(ioCallback).not.toBeNull();
    ioCallback!(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("does not fetch again while a page is already in flight (single in-flight request per page)", () => {
    mockReturn = {
      ...mockReturn,
      isLoading: false,
      hasNextPage: true,
      isFetchingNextPage: true,
      data: { pages: [{ posts: [post("1")] }] },
    };
    render(<PostFeed classId="class-1" isOwner={false} />);

    ioCallback!(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(fetchNextPage).not.toHaveBeenCalled();
  });
});
