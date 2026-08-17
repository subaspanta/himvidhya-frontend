import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinClass } from "../api/home.api";
import { JoinRequest } from "@/features/classes/types";

export const useJoinClass = () => {
  return useMutation<JoinRequest, AxiosError, string>({
    mutationFn: (code: string) => joinClass(code),
    // Don't invalidate enrolled classes: this is a pending request, not membership.
    onError: (error) => {
      console.error(
        "Join class failed:",
        error?.response?.data || error.message,
      );
    },
  });
};

export default useJoinClass;
