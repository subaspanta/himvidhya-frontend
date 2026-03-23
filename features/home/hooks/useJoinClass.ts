import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinClass } from "../api/home.api";
import { ClassCard } from "@/features/batches";
import { QUERY_KEYS } from "@/config/constants";

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, string>({
    mutationFn: (code: string) =>
      joinClass(code) as unknown as Promise<ClassCard>,
    onSuccess: (data) => {
      // Refresh enrolled classes so UI shows newly joined class
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
    onError: (error) => {
      console.error(
        "Join class failed:",
        error?.response?.data || error.message,
      );
    },
  });
};

export default useJoinClass;
