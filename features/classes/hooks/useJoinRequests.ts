import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { TeacherJoinRequest } from "@/features/classes/types";
import { getJoinRequests } from "../api/classes.api";
import { QUERY_KEYS } from "@/config/constants";

export const useJoinRequests = (
  options?: Omit<
    UseQueryOptions<TeacherJoinRequest[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<TeacherJoinRequest[], AxiosError>({
    queryKey: QUERY_KEYS.joinRequests,
    queryFn: getJoinRequests,
    refetchInterval: 15000,
    ...options,
  });
};

export default useJoinRequests;
