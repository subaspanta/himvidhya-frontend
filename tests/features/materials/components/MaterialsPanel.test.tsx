import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MaterialsPanel } from "@/features/materials/components/MaterialsPanel";

const mocks = vi.hoisted(() => ({
  useClassContext: vi.fn(),
  useMaterials: vi.fn(),
}));

vi.mock("@/features/classes/context/ClassContext", () => ({
  useClassContext: () => mocks.useClassContext(),
}));
vi.mock("@/features/materials/hooks/useMaterials", () => ({
  useMaterials: (...args: unknown[]) => mocks.useMaterials(...args),
}));
vi.mock("@/features/materials/hooks/useDebouncedValue", () => ({
  useDebouncedValue: (value: string) => value,
}));
vi.mock("@/features/materials/components/MaterialDialogs", () => ({
  UploadMaterialDialog: () => null,
}));

const emptyQuery = {
  data: { pages: [{ materials: [], meta: { hasMore: false, nextCursor: null } }] },
  isLoading: false,
  isError: false,
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: vi.fn(),
  refetch: vi.fn(),
};

describe("MaterialsPanel", () => {
  beforeEach(() => {
    mocks.useMaterials.mockReturnValue(emptyQuery);
  });

  it("lets an active class owner add the first material", () => {
    mocks.useClassContext.mockReturnValue({
      classDetails: { id: "class-1" },
      isOwner: true,
      isArchived: false,
    });

    render(<MaterialsPanel />);

    expect(screen.getAllByRole("button", { name: "Add material" })).toHaveLength(2);
    expect(screen.getByRole("searchbox", { name: "Search materials" })).toBeVisible();
  });

  it("keeps archived classes read-only", () => {
    mocks.useClassContext.mockReturnValue({
      classDetails: { id: "class-1" },
      isOwner: true,
      isArchived: true,
    });

    render(<MaterialsPanel />);

    expect(screen.queryByRole("button", { name: "Add material" })).not.toBeInTheDocument();
    expect(screen.getByText("No materials yet")).toBeVisible();
  });
});
