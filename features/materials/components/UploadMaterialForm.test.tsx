import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UploadMaterialForm } from "./UploadMaterialForm";

const mutateAsync = vi.fn();
vi.mock("../hooks/useUploadMaterial", () => ({
  useUploadMaterial: () => ({ mutateAsync, isPending: false }),
}));

beforeEach(() => {
  mutateAsync.mockReset();
  mutateAsync.mockResolvedValue({});
});

function getFileInput() {
  return document.getElementById("material-file") as HTMLInputElement;
}

describe("UploadMaterialForm", () => {
  it("rejects a disallowed file type before any mutation runs", async () => {
    render(<UploadMaterialForm classId="class-1" isOpen onClose={vi.fn()} />);

    // user-event's upload() respects the input's accept attribute and
    // silently drops non-matching files, same as a real browser's file
    // picker -- fireEvent bypasses that so the JS-level validation this
    // test targets (the drag-and-drop / "All Files" path a real accept
    // attribute can't cover) actually runs.
    const badFile = new File(["x"], "virus.exe", { type: "application/x-msdownload" });
    fireEvent.change(getFileInput(), { target: { files: [badFile] } });

    expect(await screen.findByText(/file type not supported/i)).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("rejects a file over the 25MB limit before any mutation runs", async () => {
    const user = userEvent.setup();
    render(<UploadMaterialForm classId="class-1" isOpen onClose={vi.fn()} />);

    const oversized = new File([new Uint8Array(1)], "big.pdf", { type: "application/pdf" });
    Object.defineProperty(oversized, "size", { value: 26 * 1024 * 1024 });
    await user.upload(getFileInput(), oversized);

    expect(await screen.findByText(/exceeds the 25 mb size limit/i)).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("accepts a valid file, prefills the title, and submits on save", async () => {
    const user = userEvent.setup();
    render(<UploadMaterialForm classId="class-1" isOpen onClose={vi.fn()} />);

    const goodFile = new File(["content"], "midterm-review.pdf", { type: "application/pdf" });
    await user.upload(getFileInput(), goodFile);

    expect(screen.getByDisplayValue("midterm-review")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^upload$/i }));

    expect(mutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({ file: goodFile, title: "midterm-review" }),
    );
  });
});
