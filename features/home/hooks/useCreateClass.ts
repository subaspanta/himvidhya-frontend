import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClassCard } from "@/features/class/types";
import { createClassApi } from "../api/home.api";

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ClassCard,
    AxiosError,
    { name: string; subject: string; description: string }
  >({
    mutationFn: (data) => createClassApi(data),
    onError: (error) => {
      console.error(
        "Create class failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: (data) => {
      // ensure enrolled classes list is refreshed so new class appears
      queryClient.invalidateQueries({ queryKey: ["enrolledClasses"] });
    },
  });
};

export default useCreateClass;
