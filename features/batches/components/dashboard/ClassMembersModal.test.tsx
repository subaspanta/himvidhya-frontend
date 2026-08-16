import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClassMembersModal } from "./ClassMembersModal";
import type { ClassCard, ClassMember } from "../../types";

let mockReturn: {
  data: ClassMember[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

vi.mock("@/features/home/hooks/useClassMembers", () => ({
  useClassMembers: () => mockReturn,
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

describe("ClassMembersModal", () => {
  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders the owner and each active student", () => {
    mockReturn = {
      data: [
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
      ],
      isLoading: false,
      isError: false,
    };

    render(<ClassMembersModal isOpen onClose={onClose} batch={batch} />);

    expect(screen.getByText("Teacher One")).toBeInTheDocument();
    expect(screen.getByText("Teacher")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  });

  it("renders an empty state when no students have joined", () => {
    mockReturn = { data: [], isLoading: false, isError: false };

    render(<ClassMembersModal isOpen onClose={onClose} batch={batch} />);

    expect(
      screen.getByText("No students have joined this class yet."),
    ).toBeInTheDocument();
  });

  it("renders a loading state", () => {
    mockReturn = { data: undefined, isLoading: true, isError: false };

    render(<ClassMembersModal isOpen onClose={onClose} batch={batch} />);

    expect(
      screen.queryByText("No students have joined this class yet."),
    ).not.toBeInTheDocument();
  });

  it("renders an error state", () => {
    mockReturn = { data: undefined, isLoading: false, isError: true };

    render(<ClassMembersModal isOpen onClose={onClose} batch={batch} />);

    expect(
      screen.getByText("Unable to load members. Please try again."),
    ).toBeInTheDocument();
  });
});
