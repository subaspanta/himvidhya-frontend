import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";
import { listMaterialsApi } from "../api/materials.api";
import type { MaterialsPage } from "../types";

export const useMaterials = (classId: string, q?: string) => {
  return useInfiniteQuery<MaterialsPage>({
    queryKey: QUERY_KEYS.classMaterials(classId, q),
    queryFn: ({ pageParam }) =>
      listMaterialsApi(classId, { cursor: pageParam as string | undefined, q }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextCursor : undefined,
    enabled: Boolean(classId),
  });
};

export default useMaterials;
