export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
}>;
