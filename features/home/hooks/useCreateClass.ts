import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createClassApi, type CreateClassPayload } from "../api/home.api";
import { ClassCard } from "@/features/batches";
import { QUERY_KEYS } from "@/config/constants";

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, CreateClassPayload>({
    mutationFn: (data) => createClassApi(data),
    onError: (error) => {
      console.error(
        "Create class failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: (data) => {
      // ensure enrolled classes list is refreshed so new class appears
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
  });
};

export default useCreateClass;
