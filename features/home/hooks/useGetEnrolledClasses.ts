import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClassCard } from "@/features/class/types";
import { getEnrolledClasses } from "../api/home.api";

export const useGetEnrolledClasses = (
  options?: Omit<
    UseQueryOptions<ClassCard[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ClassCard[], AxiosError>({
    queryKey: ["enrolledClasses"],
    queryFn: getEnrolledClasses,
    ...options,
  });
};
