import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MaterialRow } from "./MaterialRow";
import type { Material } from "../types";

const material: Material = {
  id: "material-1",
  classId: "class-1",
  title: "Lecture Notes",
  description: "Week 1 slides",
  fileName: "notes.pdf",
  mimeType: "application/pdf",
  size: 102400,
  uploadedBy: {
    _id: "teacher-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
};

const downloadMutate = vi.fn();
vi.mock("../hooks/useDownloadMaterial", () => ({
  useDownloadMaterial: () => ({ mutate: downloadMutate, isPending: false }),
}));

const updateMutate = vi.fn();
vi.mock("../hooks/useUpdateMaterial", () => ({
  useUpdateMaterial: () => ({ mutate: updateMutate, isPending: false }),
}));

const replaceMutate = vi.fn();
vi.mock("../hooks/useReplaceMaterial", () => ({
  useReplaceMaterial: () => ({ mutate: replaceMutate, isPending: false }),
}));

const deleteMutate = vi.fn();
vi.mock("../hooks/useDeleteMaterial", () => ({
  useDeleteMaterial: () => ({ mutate: deleteMutate, isPending: false }),
}));

beforeEach(() => {
  downloadMutate.mockReset();
  updateMutate.mockReset();
  replaceMutate.mockReset();
  deleteMutate.mockReset();
});

describe("MaterialRow", () => {
  it("renders title, size, uploader, and date", () => {
    render(<MaterialRow material={material} classId="class-1" isOwner={false} />);

    expect(screen.getByText("Lecture Notes")).toBeInTheDocument();
    expect(screen.getByText(/100 KB/)).toBeInTheDocument();
    expect(screen.getByText(/Teacher One/)).toBeInTheDocument();
  });

  it("always shows a download control", async () => {
    const user = userEvent.setup();
    render(<MaterialRow material={material} classId="class-1" isOwner={false} />);

    await user.click(screen.getByRole("button", { name: /download lecture notes/i }));

    expect(downloadMutate).toHaveBeenCalledWith("material-1", expect.anything());
  });

  it("hides edit/replace/delete controls for a non-owner", () => {
    render(<MaterialRow material={material} classId="class-1" isOwner={false} />);

    expect(screen.queryByRole("button", { name: /edit lecture notes/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /delete lecture notes/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /replace file/i })).not.toBeInTheDocument();
  });

  it("shows edit/replace/delete controls for the owner", () => {
    render(<MaterialRow material={material} classId="class-1" isOwner />);

    expect(screen.getByRole("button", { name: /edit lecture notes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete lecture notes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replace file/i })).toBeInTheDocument();
  });

  it("saves an edited title via the owner edit flow", async () => {
    const user = userEvent.setup();
    render(<MaterialRow material={material} classId="class-1" isOwner />);

    await user.click(screen.getByRole("button", { name: /edit lecture notes/i }));
    const titleInput = screen.getByDisplayValue("Lecture Notes");
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Notes");
    await user.click(screen.getByRole("button", { name: /^save$/i }));

    expect(updateMutate).toHaveBeenCalledWith(
      { materialId: "material-1", data: { title: "Updated Notes", description: "Week 1 slides" } },
      expect.anything(),
    );
  });

  it("requires a confirm step before deleting", async () => {
    const user = userEvent.setup();
    render(<MaterialRow material={material} classId="class-1" isOwner />);

    await user.click(screen.getByRole("button", { name: /delete lecture notes/i }));
    expect(deleteMutate).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /confirm/i }));
    expect(deleteMutate).toHaveBeenCalledWith("material-1", expect.anything());
  });
});
