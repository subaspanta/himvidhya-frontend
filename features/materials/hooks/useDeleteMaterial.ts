import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { deleteMaterialApi } from "../api/materials.api";
import type { MaterialsPage } from "../types";

function removeMaterialFromCache(
  data: InfiniteData<MaterialsPage> | undefined,
  materialId: string,
): InfiniteData<MaterialsPage> | undefined {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      materials: page.materials.filter((material) => material.id !== materialId),
    })),
  };
}

export function useDeleteMaterial(classId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteMaterialApi,
    onSuccess: (_, materialId) => {
      queryClient.setQueriesData<InfiniteData<MaterialsPage>>(
        { queryKey: ["classMaterials", classId] },
        (data) => removeMaterialFromCache(data, materialId),
      );
    },
  });
}
