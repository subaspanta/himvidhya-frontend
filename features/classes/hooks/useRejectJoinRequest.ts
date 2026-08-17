import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { rejectJoinRequest } from "../api/classes.api";
import { JoinRequest } from "@/features/classes/types";
import { QUERY_KEYS } from "@/config/constants";

export const useRejectJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<JoinRequest, AxiosError, string>({
    mutationFn: (requestId: string) => rejectJoinRequest(requestId),
    onError: (error) => {
      console.error(
        "Reject join request failed:",
        error?.response?.data || error.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.joinRequests });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.joinRequestsCount,
      });
    },
  });
};

export default useRejectJoinRequest;
