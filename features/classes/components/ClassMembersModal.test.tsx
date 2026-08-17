import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassMembersModal } from "./ClassMembersModal";
import type { ClassCard, ClassMember } from "../types";

let mockReturn: {
  data: ClassMember[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

vi.mock("@/features/classes/hooks/useClassMembers", () => ({
  useClassMembers: () => mockReturn,
}));

const removeMutate = vi.fn();
vi.mock("@/features/classes/hooks/useRemoveClassMember", () => ({
  useRemoveClassMember: () => ({
    mutate: removeMutate,
    isPending: false,
  }),
}));

const onClose = vi.fn();

const batch: ClassCard = {
  id: "class-1",
  name: "Algebra I",
  subject: "Math",
  code: "ABC123",
  studentCount: 1,
  lastActivity: null,
  unreadMessages: 0,
  status: "active",
  owner: {
    _id: "owner-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
};

const oneStudent: ClassMember[] = [
  {
    user: {
      _id: "student-1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "student",
      avatar: null,
    },
    joinedAt: "2026-01-01T00:00:00.000Z",
  },
];

describe("ClassMembersModal", () => {
  beforeEach(() => {
    onClose.mockClear();
    removeMutate.mockClear();
  });

  it("renders the owner and each active student", () => {
    mockReturn = { data: oneStudent, isLoading: false, isError: false };

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner={false}
      />,
    );

    expect(screen.getByText("Teacher One")).toBeInTheDocument();
    expect(screen.getByText("Teacher")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  });

  it("renders an empty state when no students have joined", () => {
    mockReturn = { data: [], isLoading: false, isError: false };

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner={false}
      />,
    );

    expect(
      screen.getByText("No students have joined this class yet."),
    ).toBeInTheDocument();
  });

  it("renders a loading state", () => {
    mockReturn = { data: undefined, isLoading: true, isError: false };

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner={false}
      />,
    );

    expect(
      screen.queryByText("No students have joined this class yet."),
    ).not.toBeInTheDocument();
  });

  it("renders an error state", () => {
    mockReturn = { data: undefined, isLoading: false, isError: true };

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner={false}
      />,
    );

    expect(
      screen.getByText("Unable to load members. Please try again."),
    ).toBeInTheDocument();
  });

  it("hides the remove action for a non-owner viewer", () => {
    mockReturn = { data: oneStudent, isLoading: false, isError: false };

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner={false}
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Remove Ada Lovelace" }),
    ).not.toBeInTheDocument();
  });

  it("shows the remove action for the owner and asks for confirmation first", async () => {
    mockReturn = { data: oneStudent, isLoading: false, isError: false };
    const user = userEvent.setup();

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remove Ada Lovelace" }),
    );

    expect(removeMutate).not.toHaveBeenCalled();
    expect(screen.getByText("Remove Ada Lovelace?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(removeMutate).toHaveBeenCalledTimes(1);
    expect(removeMutate).toHaveBeenCalledWith(
      { classId: "class-1", userId: "student-1" },
      expect.anything(),
    );
  });

  it("cancels the remove confirmation without calling the mutation", async () => {
    mockReturn = { data: oneStudent, isLoading: false, isError: false };
    const user = userEvent.setup();

    render(
      <ClassMembersModal
        isOpen
        onClose={onClose}
        batch={batch}
        isOwner
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remove Ada Lovelace" }),
    );
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(removeMutate).not.toHaveBeenCalled();
    expect(screen.queryByText("Remove Ada Lovelace?")).not.toBeInTheDocument();
  });
});
