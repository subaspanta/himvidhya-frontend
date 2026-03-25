import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClassCard } from "@/features/batches/types";
import { getEnrolledClasses } from "../api/home.api";
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
    ...options,
  });
};
