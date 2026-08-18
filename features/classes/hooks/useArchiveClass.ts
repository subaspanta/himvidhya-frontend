import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { archiveClassApi } from "../api/classes.api";
import { ClassCard } from "@/features/classes";
import { QUERY_KEYS } from "@/config/constants";

export const useArchiveClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, string>({
    mutationFn: (classId: string) => archiveClassApi(classId),
    onError: (error) => {
      console.error(
        "Archive class failed:",
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

export default useArchiveClass;
