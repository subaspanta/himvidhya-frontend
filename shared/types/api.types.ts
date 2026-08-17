export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

// Cursor-pagination meta axiosClient's response interceptor forwards onto
// response.meta (D13/C11). Callers of a paginated endpoint pass this as the
// second generic to apiClient.get<T, PaginatedAxiosResponse<T>>(...) to type
// response.meta without an `as` cast at the call site.
export type PaginationMeta = {
  nextCursor: string | null;
  hasMore: boolean;
};

export type PaginatedAxiosResponse<T> = {
  data: T;
  meta: PaginationMeta;
};
