import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinClass } from "../api/home.api";
import { ClassCard } from "@/features/batches";

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ClassCard, AxiosError, string>({
    mutationFn: (code: string) => joinClass(code),
    onSuccess: (data) => {
      // Refresh enrolled classes so UI shows newly joined class
      queryClient.invalidateQueries({ queryKey: ["enrolledClasses"] });
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
