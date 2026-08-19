import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostCard } from "@/features/posts/components/PostCard";
import type { Post } from "@/features/posts/types";

vi.mock("@/features/posts/hooks/useDownloadPostAttachment", () => ({
  useDownloadPostAttachment: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

const post: Post = {
  id: "post-1",
  title: "Welcome to class",
  content: "First day announcements go here.",
  classId: "class-1",
  authorId: {
    _id: "teacher-1",
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

describe("PostCard", () => {
  it("renders title and content as plain text", () => {
    render(<PostCard post={post} isOwner={false} />);

    expect(screen.getByText("Welcome to class")).toBeInTheDocument();
    expect(
      screen.getByText("First day announcements go here."),
    ).toBeInTheDocument();
  });

  it("does not render pin/unpin controls for a non-owner", () => {
    render(<PostCard post={post} isOwner={false} />);

    expect(
      screen.queryByRole("button", { name: /pin/i }),
    ).not.toBeInTheDocument();
  });

  it("renders a Pin control for the owner on an unpinned post, and calls onPin when clicked", async () => {
    const onPin = vi.fn();
    const user = userEvent.setup();
    render(<PostCard post={post} isOwner onPin={onPin} />);

    const pinButton = screen.getByRole("button", { name: /^pin$/i });
    await user.click(pinButton);

    expect(onPin).toHaveBeenCalledWith("post-1");
  });

  it("renders an Unpin control for the owner on a pinned post", () => {
    render(<PostCard post={{ ...post, isPinned: true }} isOwner onUnpin={vi.fn()} />);

    expect(screen.getByRole("button", { name: /^unpin$/i })).toBeInTheDocument();
  });

  it("shows a pinned indicator when the post is pinned", () => {
    render(<PostCard post={{ ...post, isPinned: true }} isOwner={false} />);

    expect(screen.getByText(/pinned/i)).toBeInTheDocument();
  });

  it("shows a tombstone message instead of content for a deleted post", () => {
    render(
      <PostCard
        post={{ ...post, deletedAt: "2026-08-17T01:00:00.000Z" }}
        isOwner={false}
      />,
    );

    expect(screen.queryByText(post.content)).not.toBeInTheDocument();
    expect(screen.getByText(/this announcement was deleted/i)).toBeInTheDocument();
  });
});
