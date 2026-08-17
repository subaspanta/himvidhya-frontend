import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreatePostForm } from "./CreatePostForm";

const mutateAsync = vi.fn().mockResolvedValue(undefined);

vi.mock("../hooks/useCreatePost", () => ({
  useCreatePost: () => ({
    mutateAsync,
    isPending: false,
  }),
}));

describe("CreatePostForm", () => {
  beforeEach(() => {
    mutateAsync.mockClear();
  });

  it("submits title and content", async () => {
    const user = userEvent.setup();
    render(<CreatePostForm classId="class-1" />);

    await user.type(screen.getByLabelText(/title/i), "Welcome");
    await user.type(screen.getByLabelText(/content/i), "First day notes.");
    await user.click(screen.getByRole("button", { name: /post/i }));

    expect(mutateAsync).toHaveBeenCalledTimes(1);
    expect(mutateAsync).toHaveBeenCalledWith({
      title: "Welcome",
      content: "First day notes.",
    });
  });

  it("shows a validation error and does not submit when title is empty", async () => {
    const user = userEvent.setup();
    render(<CreatePostForm classId="class-1" />);

    await user.type(screen.getByLabelText(/content/i), "Body only");
    await user.click(screen.getByRole("button", { name: /post/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("clears the form after a successful submit", async () => {
    const user = userEvent.setup();
    render(<CreatePostForm classId="class-1" />);

    const titleField = screen.getByLabelText(/title/i) as HTMLInputElement;
    await user.type(titleField, "Welcome");
    await user.type(screen.getByLabelText(/content/i), "First day notes.");
    await user.click(screen.getByRole("button", { name: /post/i }));

    expect(await screen.findByLabelText(/title/i)).toHaveValue("");
  });
});
