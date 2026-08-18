import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateClassApi, type UpdateClassPayload } from "../api/classes.api";
import { ClassCard } from "@/features/classes";
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
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.classById(variables.classId),
      });
    },
  });
};

export default useUpdateClass;
