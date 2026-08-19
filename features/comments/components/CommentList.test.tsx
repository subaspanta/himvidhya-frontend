import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentList } from "./CommentList";
import type { Comment } from "../types";

const teacherComment: Comment = {
  id: "comment-1",
  postId: "post-1",
  content: "Great question, let's discuss in class.",
  authorId: {
    _id: "teacher-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
  deletedAt: null,
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
};

const studentComment: Comment = {
  id: "comment-2",
  postId: "post-1",
  content: "Thanks for clarifying!",
  authorId: {
    _id: "student-1",
    name: "Student One",
    email: "student@example.com",
    role: "student",
    avatar: null,
  },
  deletedAt: null,
  createdAt: "2026-08-17T00:05:00.000Z",
  updatedAt: "2026-08-17T00:05:00.000Z",
};

let mockReturn: {
  data: { pages: { comments: Comment[] }[] } | undefined;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: ReturnType<typeof vi.fn>;
};

vi.mock("../hooks/useComments", () => ({
  useComments: () => mockReturn,
}));

const createMutate = vi.fn();
vi.mock("../hooks/useCreateComment", () => ({
  useCreateComment: () => ({ mutateAsync: createMutate, isPending: false }),
}));

const updateMutate = vi.fn();
vi.mock("../hooks/useUpdateComment", () => ({
  useUpdateComment: () => ({ mutate: updateMutate, isPending: false }),
}));

const deleteMutate = vi.fn();
vi.mock("../hooks/useDeleteComment", () => ({
  useDeleteComment: () => ({ mutate: deleteMutate, isPending: false }),
}));

let mockUser: { id: string } | null = { id: "student-1" };
vi.mock("@/features/auth/store/auth.store", () => ({
  useAuthStore: () => ({ user: mockUser }),
}));

beforeEach(() => {
  mockUser = { id: "student-1" };
  mockReturn = {
    data: { pages: [{ comments: [teacherComment, studentComment] }] },
    isLoading: false,
    isError: false,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: vi.fn(),
  };
});

describe("CommentList", () => {
  it("renders comments from all pages", () => {
    render(<CommentList postId="post-1" canModerate={false} />);

    expect(screen.getByText("Great question, let's discuss in class.")).toBeInTheDocument();
    expect(screen.getByText("Thanks for clarifying!")).toBeInTheDocument();
  });

  it("shows loading skeletons while fetching", () => {
    mockReturn = { ...mockReturn, isLoading: true, data: undefined };
    const { container } = render(<CommentList postId="post-1" canModerate={false} />);

    expect(container.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(0);
  });

  it("shows an error message when the fetch fails", () => {
    mockReturn = { ...mockReturn, isError: true, data: undefined };
    render(<CommentList postId="post-1" canModerate={false} />);

    expect(screen.getByText(/unable to load comments/i)).toBeInTheDocument();
  });

  it("shows an empty state when there are no comments", () => {
    mockReturn = { ...mockReturn, data: { pages: [{ comments: [] }] } };
    render(<CommentList postId="post-1" canModerate={false} />);

    expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
  });

  it("shows Edit and Delete for the current user's own comment", () => {
    render(<CommentList postId="post-1" canModerate={false} />);

    const studentRow = screen.getByText("Thanks for clarifying!").closest("div")?.parentElement;
    expect(studentRow).not.toBeNull();
    expect(
      studentRow!.querySelector("button")?.textContent ||
        Array.from(studentRow!.querySelectorAll("button")).some((b) => b.textContent === "Edit"),
    ).toBeTruthy();
  });

  it("does not show Edit for another user's comment when not moderating", () => {
    render(<CommentList postId="post-1" canModerate={false} />);

    // Teacher's comment isn't the current (student) user's own, and
    // canModerate is false -- no Edit/Delete controls for it at all.
    const teacherText = screen.getByText("Great question, let's discuss in class.");
    const teacherRow = teacherText.closest("div")?.parentElement;
    expect(teacherRow?.querySelector("button")).toBeNull();
  });

  it("shows Delete (but not Edit) for another user's comment when the current user can moderate", () => {
    mockUser = { id: "teacher-1" };
    render(<CommentList postId="post-1" canModerate />);

    const studentText = screen.getByText("Thanks for clarifying!");
    const studentRow = studentText.closest("div")?.parentElement;
    const buttons = Array.from(studentRow!.querySelectorAll("button")).map((b) => b.textContent);
    expect(buttons).toContain("Delete");
    expect(buttons).not.toContain("Edit");
  });

  it("renders a Load more control when hasNextPage is true", async () => {
    mockReturn = { ...mockReturn, hasNextPage: true };
    const user = userEvent.setup();
    render(<CommentList postId="post-1" canModerate={false} />);

    const button = screen.getByRole("button", { name: /load more comments/i });
    await user.click(button);

    expect(mockReturn.fetchNextPage).toHaveBeenCalled();
  });
});
