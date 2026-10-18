import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  confirmMaterialUploadApi,
  putFileToStorageApi,
  requestMaterialUploadUrlApi,
} from "../api/materials.api";
import type { Material } from "../types";

export type CreateMaterialVariables = {
  file: File;
  title: string;
  description?: string;
};

export function useCreateMaterial(classId: string) {
  const queryClient = useQueryClient();

  return useMutation<Material, Error, CreateMaterialVariables>({
    mutationFn: async ({ file, title, description }) => {
      const { uploadUrl, storageKey } = await requestMaterialUploadUrlApi(classId, {
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
      });
      await putFileToStorageApi(uploadUrl, file);
      return confirmMaterialUploadApi(classId, {
        storageKey,
        title,
        description: description || undefined,
        fileName: file.name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classMaterials", classId],
      });
    },
  });
}
