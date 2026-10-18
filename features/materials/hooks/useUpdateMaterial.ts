import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import {
  putFileToStorageApi,
  requestMaterialReplaceUrlApi,
  updateMaterialApi,
} from "../api/materials.api";
import type { Material, MaterialsPage } from "../types";

export type UpdateMaterialVariables = {
  materialId: string;
  title?: string;
  description?: string;
  replacementFile?: File;
};

function replaceMaterialInCache(
  data: InfiniteData<MaterialsPage> | undefined,
  updated: Material,
): InfiniteData<MaterialsPage> | undefined {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      materials: page.materials.map((material) =>
        material.id === updated.id ? updated : material,
      ),
    })),
  };
}

export function useUpdateMaterial(classId: string) {
  const queryClient = useQueryClient();

  return useMutation<Material, Error, UpdateMaterialVariables>({
    mutationFn: async ({ materialId, replacementFile, ...metadata }) => {
      if (!replacementFile) return updateMaterialApi(materialId, metadata);

      const { uploadUrl, storageKey } = await requestMaterialReplaceUrlApi(
        materialId,
        {
          fileName: replacementFile.name,
          mimeType: replacementFile.type,
          size: replacementFile.size,
        },
      );
      await putFileToStorageApi(uploadUrl, replacementFile);
      return updateMaterialApi(materialId, {
        ...metadata,
        storageKey,
        fileName: replacementFile.name,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueriesData<InfiniteData<MaterialsPage>>(
        { queryKey: ["classMaterials", classId] },
        (data) => replaceMaterialInCache(data, updated),
      );
    },
  });
}
