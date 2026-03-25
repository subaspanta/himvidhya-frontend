import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinClass } from "../api/home.api";
import { QUERY_KEYS } from "@/config/constants";
import { JoinRequest } from "@/features/batches/types";

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation<JoinRequest, AxiosError, string>({
    mutationFn: (code: string) => joinClass(code),
    onSuccess: () => {
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
