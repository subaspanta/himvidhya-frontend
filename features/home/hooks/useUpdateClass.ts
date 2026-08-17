import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateClassApi, type UpdateClassPayload } from "../api/home.api";
import { ClassCard } from "@/features/batches";
import { QUERY_KEYS } from "@/config/constants";

type UpdateClassVariables = {
  classId: string;
  data: UpdateClassPayload;
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, UpdateClassVariables>({
    mutationFn: ({ classId, data }) => updateClassApi(classId, data),
    onError: (error) => {
      console.error(
        "Update class failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
  });
};

export default useUpdateClass;
