import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { removeClassMemberApi } from "../api/home.api";
import { QUERY_KEYS } from "@/config/constants";

type RemoveClassMemberVariables = {
  classId: string;
  userId: string;
};

export const useRemoveClassMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, RemoveClassMemberVariables>({
    mutationFn: ({ classId, userId }) =>
      removeClassMemberApi(classId, userId),
    onError: (error) => {
      console.error(
        "Remove class member failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.classMembers(variables.classId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
  });
};

export default useRemoveClassMember;
