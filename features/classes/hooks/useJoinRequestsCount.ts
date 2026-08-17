import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getJoinRequestsCount } from "../api/classes.api";
import { QUERY_KEYS } from "@/config/constants";

export const useJoinRequestsCount = (
  options?: Omit<UseQueryOptions<number, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery<number, AxiosError>({
    queryKey: QUERY_KEYS.joinRequestsCount,
    queryFn: getJoinRequestsCount,
    ...options,
  });
};

export default useJoinRequestsCount;
