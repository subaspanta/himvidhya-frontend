import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { leaveClassApi } from "../api/classes.api";
import { QUERY_KEYS } from "@/config/constants";

export const useLeaveClass = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (classId: string) => leaveClassApi(classId),
    onError: (error) => {
      console.error(
        "Leave class failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
  });
};

export default useLeaveClass;
