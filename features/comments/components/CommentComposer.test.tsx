import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentComposer } from "./CommentComposer";

const mutateAsync = vi.fn();
vi.mock("../hooks/useCreateComment", () => ({
  useCreateComment: () => ({ mutateAsync, isPending: false }),
}));

beforeEach(() => {
  mutateAsync.mockReset();
  mutateAsync.mockResolvedValue({});
});

describe("CommentComposer", () => {
  it("submits trimmed content and clears the field", async () => {
    const user = userEvent.setup();
    render(<CommentComposer postId="post-1" />);

    const textarea = screen.getByPlaceholderText(/write a comment/i);
    await user.type(textarea, "Nice explanation!");
    await user.click(screen.getByRole("button", { name: /comment/i }));

    expect(mutateAsync).toHaveBeenCalledWith({ content: "Nice explanation!" });
  });

  it("shows a validation error and does not submit for empty content", async () => {
    const user = userEvent.setup();
    render(<CommentComposer postId="post-1" />);

    await user.click(screen.getByRole("button", { name: /comment/i }));

    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });
});
