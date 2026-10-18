import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMaterials } from "@/features/materials/hooks/useMaterials";
import type { MaterialsPage } from "@/features/materials/types";

const listMaterialsApi = vi.hoisted(() => vi.fn());

vi.mock("@/features/materials/api/materials.api", () => ({
  listMaterialsApi: (...args: unknown[]) => listMaterialsApi(...args),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const emptyPage: MaterialsPage = {
  materials: [],
  meta: { nextCursor: null, hasMore: false },
};

describe("useMaterials", () => {
  it("sends the class, cursor, and search query to the list endpoint", async () => {
    listMaterialsApi.mockResolvedValueOnce(emptyPage);

    const { result } = renderHook(() => useMaterials("class-1", "algebra"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(listMaterialsApi).toHaveBeenCalledWith("class-1", {
      cursor: undefined,
      q: "algebra",
    });
  });
});
