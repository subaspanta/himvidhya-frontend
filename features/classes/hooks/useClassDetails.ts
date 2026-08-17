import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClassDetails } from "@/features/classes/types";
import { getClassDetails } from "../api/classes.api";
import { QUERY_KEYS } from "@/config/constants";

export const useClassDetails = (
  classId: string,
  options?: Omit<
    UseQueryOptions<ClassDetails, AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ClassDetails, AxiosError>({
    queryKey: QUERY_KEYS.classById(classId),
    queryFn: () => getClassDetails(classId),
    enabled: Boolean(classId),
    ...options,
  });
};
