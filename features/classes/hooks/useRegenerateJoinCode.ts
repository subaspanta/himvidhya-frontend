import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { regenerateJoinCodeApi } from "../api/classes.api";
import { ClassCard } from "@/features/classes";
import { QUERY_KEYS } from "@/config/constants";

export const useRegenerateJoinCode = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, string>({
    mutationFn: (classId: string) => regenerateJoinCodeApi(classId),
    onError: (error) => {
      console.error(
        "Regenerate join code failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
  });
};

export default useRegenerateJoinCode;
