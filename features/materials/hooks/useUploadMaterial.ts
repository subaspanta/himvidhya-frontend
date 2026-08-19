import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  requestUploadUrlApi,
  putFileToStorageApi,
  confirmMaterialUploadApi,
} from "../api/materials.api";
import { Material } from "../types";
import { QUERY_KEYS } from "@/config/constants";

export type UploadMaterialArgs = {
  file: File;
  title: string;
  description?: string;
};

// Composes the three-step presigned flow (ADR-0005): request a URL, PUT
// bytes directly to storage, then confirm so the API can verify the real
// object before creating the Material record.
export const useUploadMaterial = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Material, AxiosError, UploadMaterialArgs>({
    mutationFn: async ({ file, title, description }) => {
      const { uploadUrl, storageKey } = await requestUploadUrlApi(classId, {
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
      });
      await putFileToStorageApi(uploadUrl, file);
      return confirmMaterialUploadApi(classId, {
        storageKey,
        title,
        description,
        fileName: file.name,
      });
    },
    onError: (error) => {
      console.error("Upload material failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      // Prefix match invalidates every q-variant cached for this class.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classMaterials(classId) });
    },
  });
};

export default useUploadMaterial;
