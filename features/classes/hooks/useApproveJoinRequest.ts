import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { approveJoinRequest } from "../api/classes.api";
import { JoinRequest } from "@/features/classes/types";
import { QUERY_KEYS } from "@/config/constants";

export const useApproveJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<JoinRequest, AxiosError, string>({
    mutationFn: (requestId: string) => approveJoinRequest(requestId),
    onError: (error) => {
      console.error(
        "Approve join request failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.joinRequests });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.joinRequestsCount,
      });
      // Approval adds a member, which changes the class card's studentCount.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.enrolledClasses });
    },
  });
};

export default useApproveJoinRequest;
