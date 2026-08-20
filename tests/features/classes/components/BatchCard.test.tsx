import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BatchCard from "@/features/classes/components/BatchCard";
import type { ClassCard } from "@/features/classes/types";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const archiveMutate = vi.fn();
vi.mock("@/features/classes/hooks/useArchiveClass", () => ({
  useArchiveClass: () => ({
    mutate: archiveMutate,
    isPending: false,
  }),
}));

const restoreMutate = vi.fn();
vi.mock("@/features/classes/hooks/useRestoreClass", () => ({
  useRestoreClass: () => ({
    mutate: restoreMutate,
    isPending: false,
  }),
}));

const regenerateMutate = vi.fn();
vi.mock("@/features/classes/hooks/useRegenerateJoinCode", () => ({
  useRegenerateJoinCode: () => ({
    mutate: regenerateMutate,
    isPending: false,
  }),
}));

const leaveMutate = vi.fn();
vi.mock("@/features/classes/hooks/useLeaveClass", () => ({
  useLeaveClass: () => ({
    mutate: leaveMutate,
    isPending: false,
  }),
}));

vi.mock("@/features/classes/hooks/useUpdateClass", () => ({
  useUpdateClass: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("@/features/classes/hooks/useClassMembers", () => ({
  useClassMembers: () => ({
    data: [],
    isLoading: false,
    isError: false,
  }),
}));

vi.mock("@/features/classes/hooks/useRemoveClassMember", () => ({
  useRemoveClassMember: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

let mockUser: { id: string; role: string } | null = null;
vi.mock("@/features/auth/store/auth.store", () => ({
  useAuthStore: () => ({ user: mockUser }),
}));

const ownerBatch: ClassCard = {
  id: "class-1",
  name: "Algebra I",
  subject: "Math",
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

describe("BatchCard", () => {
  beforeEach(() => {
    push.mockClear();
    archiveMutate.mockClear();
    restoreMutate.mockClear();
    regenerateMutate.mockClear();
    leaveMutate.mockClear();
    mockUser = null;
  });

  it("shows Edit and Archive but not Restore for the owner of an active class", async () => {
    mockUser = { id: "owner-1", role: "teacher" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.getByText("Edit Class")).toBeInTheDocument();
    expect(screen.getByText("Archive Class")).toBeInTheDocument();
    expect(screen.queryByText("Restore Class")).not.toBeInTheDocument();
  });

  it("shows Restore and not Archive for the owner of an archived class", async () => {
    mockUser = { id: "owner-1", role: "teacher" };
    const user = userEvent.setup();
    render(<BatchCard batch={{ ...ownerBatch, status: "archived" }} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.getByText("Restore Class")).toBeInTheDocument();
    expect(screen.queryByText("Archive Class")).not.toBeInTheDocument();
  });

  it("hides Edit, Archive and Restore for a non-owner", async () => {
    mockUser = { id: "student-1", role: "student" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.queryByText("Edit Class")).not.toBeInTheDocument();
    expect(screen.queryByText("Archive Class")).not.toBeInTheDocument();
    expect(screen.queryByText("Restore Class")).not.toBeInTheDocument();
  });

  it("asks for confirmation before archiving, then calls the mutation", async () => {
    mockUser = { id: "owner-1", role: "teacher" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));
    await user.click(screen.getByText("Archive Class"));

    expect(archiveMutate).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "Archive this class?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Archive" }));

    expect(archiveMutate).toHaveBeenCalledTimes(1);
    expect(archiveMutate).toHaveBeenCalledWith("class-1", expect.anything());
  });

  it("restores directly without a confirmation step", async () => {
    mockUser = { id: "owner-1", role: "teacher" };
    const user = userEvent.setup();
    render(<BatchCard batch={{ ...ownerBatch, status: "archived" }} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));
    await user.click(screen.getByText("Restore Class"));

    expect(restoreMutate).toHaveBeenCalledTimes(1);
    expect(restoreMutate).toHaveBeenCalledWith("class-1", expect.anything());
  });

  it("asks for confirmation before regenerating the join code", async () => {
    mockUser = { id: "owner-1", role: "teacher" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));
    await user.click(screen.getByText("Regenerate Code"));

    expect(regenerateMutate).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "Regenerate join code?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Regenerate" }));

    expect(regenerateMutate).toHaveBeenCalledTimes(1);
    expect(regenerateMutate).toHaveBeenCalledWith(
      "class-1",
      expect.anything(),
    );
  });

  it("hides Regenerate Code for a non-owner", async () => {
    mockUser = { id: "student-1", role: "student" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.queryByText("Regenerate Code")).not.toBeInTheDocument();
  });

  it("shows View Members for both the owner and a non-owner member", async () => {
    mockUser = { id: "student-1", role: "student" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.getByText("View Members")).toBeInTheDocument();
  });

  it("shows Leave Class for a non-owner member", async () => {
    mockUser = { id: "student-1", role: "student" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.getByText("Leave Class")).toBeInTheDocument();
  });

  it("hides Leave Class for the owner", async () => {
    mockUser = { id: "owner-1", role: "teacher" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));

    expect(screen.queryByText("Leave Class")).not.toBeInTheDocument();
  });

  it("asks for confirmation before leaving, then calls the mutation", async () => {
    mockUser = { id: "student-1", role: "student" };
    const user = userEvent.setup();
    render(<BatchCard batch={ownerBatch} />);

    await user.click(screen.getByRole("button", { name: "Class options" }));
    await user.click(screen.getByText("Leave Class"));

    expect(leaveMutate).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "Leave this class?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Leave" }));

    expect(leaveMutate).toHaveBeenCalledTimes(1);
    expect(leaveMutate).toHaveBeenCalledWith("class-1", expect.anything());
  });
});
