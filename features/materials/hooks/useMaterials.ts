import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";
import { listMaterialsApi } from "../api/materials.api";
import type { MaterialsPage } from "../types";

export function useMaterials(classId: string, query = "") {
  return useInfiniteQuery<MaterialsPage>({
    queryKey: QUERY_KEYS.classMaterials(classId, query),
    queryFn: ({ pageParam }) =>
      listMaterialsApi(classId, {
        cursor: pageParam as string | undefined,
        q: query || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextCursor : undefined,
    enabled: Boolean(classId),
  });
}
