import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateMaterialApi, UpdateMaterialPayload } from "../api/materials.api";
import { Material } from "../types";
import { QUERY_KEYS } from "@/config/constants";

type UpdateMaterialArgs = { materialId: string; data: UpdateMaterialPayload };

export const useUpdateMaterial = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Material, AxiosError, UpdateMaterialArgs>({
    mutationFn: ({ materialId, data }) => updateMaterialApi(materialId, data),
    onError: (error) => {
      console.error("Update material failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classMaterials(classId) });
    },
  });
};

export default useUpdateMaterial;
