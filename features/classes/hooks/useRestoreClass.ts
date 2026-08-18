import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { restoreClassApi } from "../api/classes.api";
import { ClassCard } from "@/features/classes";
import { QUERY_KEYS } from "@/config/constants";

export const useRestoreClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, string>({
    mutationFn: (classId: string) => restoreClassApi(classId),
    onError: (error) => {
      console.error(
        "Restore class failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: (_data, classId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.classById(classId),
      });
    },
  });
};

export default useRestoreClass;
