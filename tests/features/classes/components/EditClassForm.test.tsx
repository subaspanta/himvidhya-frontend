import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditClassForm } from "@/features/classes/components/EditClassForm";
import type { ClassCard } from "@/features/classes/types";

const mutateAsync = vi.fn().mockResolvedValue(undefined);

vi.mock("@/features/classes/hooks/useUpdateClass", () => ({
  useUpdateClass: () => ({
    mutateAsync,
    isPending: false,
  }),
}));

const onClose = vi.fn();

const classData: ClassCard = {
  id: "class-1",
  name: "Algebra I",
  subject: "Math",
  description: "Intro to algebra",
  college: "MIT",
  semester: "Fall 2026",
  code: "ABC123",
  studentCount: 3,
  lastActivity: null,
  status: "active",
  createdAt: "2026-01-01T00:00:00.000Z",
  owner: {
    _id: "owner-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
};

describe("EditClassForm", () => {
  beforeEach(() => {
    mutateAsync.mockClear();
    onClose.mockClear();
  });

  it("prefills every field from classData", () => {
    render(
      <EditClassForm isOpen onClose={onClose} classData={classData} />,
    );

    expect(screen.getByLabelText(/Class name/)).toHaveValue("Algebra I");
    expect(screen.getByLabelText("Subject")).toHaveValue("Math");
    expect(screen.getByLabelText("Description")).toHaveValue(
      "Intro to algebra",
    );
    expect(screen.getByLabelText("College")).toHaveValue("MIT");
    expect(screen.getByLabelText("Semester")).toHaveValue("Fall 2026");
  });

  it("submits only the field the user changed", async () => {
    const user = userEvent.setup();
    render(
      <EditClassForm isOpen onClose={onClose} classData={classData} />,
    );

    const nameField = screen.getByLabelText(/Class name/);
    await user.clear(nameField);
    await user.type(nameField, "Algebra II");

    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(mutateAsync).toHaveBeenCalledTimes(1);
    expect(mutateAsync).toHaveBeenCalledWith({
      classId: "class-1",
      data: { name: "Algebra II" },
    });
  });

  it("shows a validation error when the name exceeds 100 characters", async () => {
    const user = userEvent.setup();
    render(
      <EditClassForm isOpen onClose={onClose} classData={classData} />,
    );

    const nameField = screen.getByLabelText(/Class name/);
    await user.clear(nameField);
    await user.type(nameField, "x".repeat(101));
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(
      await screen.findByText("Class name cannot exceed 100 characters"),
    ).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("disables the submit button until a field is changed", () => {
    render(
      <EditClassForm isOpen onClose={onClose} classData={classData} />,
    );

    expect(screen.getByRole("button", { name: "Save Changes" })).toBeDisabled();
  });
});
