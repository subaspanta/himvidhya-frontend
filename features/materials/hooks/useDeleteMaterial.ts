import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteMaterialApi } from "../api/materials.api";
import { QUERY_KEYS } from "@/config/constants";

export const useDeleteMaterial = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (materialId: string) => deleteMaterialApi(materialId),
    onError: (error) => {
      console.error("Delete material failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classMaterials(classId) });
    },
  });
};

export default useDeleteMaterial;
