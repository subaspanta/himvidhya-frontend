import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClassMember } from "@/features/classes/types";
import { getClassMembers } from "../api/classes.api";
import { QUERY_KEYS } from "@/config/constants";

export const useClassMembers = (
  classId: string,
  options?: Omit<
    UseQueryOptions<ClassMember[], AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ClassMember[], AxiosError>({
    queryKey: QUERY_KEYS.classMembers(classId),
    queryFn: () => getClassMembers(classId),
    ...options,
  });
};

export default useClassMembers;
