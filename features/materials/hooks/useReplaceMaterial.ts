import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  requestReplaceUrlApi,
  putFileToStorageApi,
  confirmMaterialReplaceApi,
} from "../api/materials.api";
import { Material } from "../types";
import { QUERY_KEYS } from "@/config/constants";

export type ReplaceMaterialArgs = { materialId: string; file: File };

// Mirrors useUploadMaterial's three-step flow but against an existing
// material: request a URL for a *new* key, PUT bytes, then confirm the
// swap via PATCH (material.service.js verifies the new object before
// touching the record, and best-effort deletes the old one).
export const useReplaceMaterial = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Material, AxiosError, ReplaceMaterialArgs>({
    mutationFn: async ({ materialId, file }) => {
      const { uploadUrl, storageKey } = await requestReplaceUrlApi(materialId, {
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
      });
      await putFileToStorageApi(uploadUrl, file);
      return confirmMaterialReplaceApi(materialId, { storageKey, fileName: file.name });
    },
    onError: (error) => {
      console.error("Replace material failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classMaterials(classId) });
    },
  });
};

export default useReplaceMaterial;
