import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClassCard } from "@/features/classes/types";
import { getEnrolledClasses } from "../api/classes.api";
import { QUERY_KEYS } from "@/config/constants";

export const useGetEnrolledClasses = (
  options?: Omit<
    UseQueryOptions<ClassCard[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ClassCard[], AxiosError>({
    queryKey: QUERY_KEYS.enrolledClasses,
    queryFn: getEnrolledClasses,
    // No realtime layer (websocket/SSE) in this app: a teacher approving a
    // join request in their own session has no way to push that to an
    // already-open student dashboard. Poll instead, same as
    // useJoinRequestsCount's teacher-side badge.
    refetchInterval: 15000,
    ...options,
  });
};
