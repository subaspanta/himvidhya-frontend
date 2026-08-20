import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

const mutate = vi.fn();

vi.mock("@/features/auth/hooks/useRegister", () => ({
  useRegister: () => ({
    mutate,
    isPending: false,
    error: null,
  }),
}));

const navigation = {
  toLogin: vi.fn(),
  toRegister: vi.fn(),
  toForgotPassword: vi.fn(),
  close: vi.fn(),
};

describe("RegisterForm", () => {
  beforeEach(() => {
    mutate.mockClear();
  });

  it("renders the role toggle, defaults to student, and submits the chosen role", async () => {
    const user = userEvent.setup();
    render(<RegisterForm navigation={navigation} />);

    expect(
      screen.getByRole("button", { name: "Student" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Teacher" }),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Full Name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/Email Address/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^password\*?$/i), "Passw0rd!");

    await user.click(screen.getByRole("button", { name: "Teacher" }));
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ada Lovelace",
        email: "ada@example.com",
        password: "Passw0rd!",
        role: "teacher",
      }),
      expect.anything(),
    );
  });
});
