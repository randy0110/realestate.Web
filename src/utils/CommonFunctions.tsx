import { ApiResponse, PagedApiResponse } from "./interface";

export function createPagedApiResponse<T>(
  data?: Partial<PagedApiResponse<T>>
): PagedApiResponse<T> {
  return {
    success: false,
    message: "",
    total: 0,
    page: 1,
    pageSize: 10,
    result: undefined as unknown as T,
    ...data,
  };
}

export function createApiResponse<T>(
  data?: Partial<ApiResponse<T>>
): ApiResponse<T> {
  return {
    success: false,
    message: "",
    result: undefined as unknown as T,
    ...data,
  };
}