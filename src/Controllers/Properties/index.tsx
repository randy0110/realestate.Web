import apiClient from '../../Services/HttpClient';
import { createApiResponse, createPagedApiResponse } from '../../utils/CommonFunctions';
import { ApiResponse, GetByIdPropertiesDto, PagedApiResponse, PropertyListDto } from '../../utils/interface';

const apiUrl = `/api/Properties`;

export const getList = async (params: {
  name?: string;
  address?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
}): Promise<PagedApiResponse<PropertyListDto[] | undefined>> => {
  try {
    const { data } = await apiClient.get<PagedApiResponse<PropertyListDto[]>>(
      `${apiUrl}/List`,
      { params }
    );
    return data;
  } catch (error) {
    return createPagedApiResponse<undefined>({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getById = async (id: string ): Promise<ApiResponse<GetByIdPropertiesDto | undefined>> => {
  try {
    const { data } = await apiClient.get<ApiResponse<GetByIdPropertiesDto>>(
      `${apiUrl}/${id}`);
    return data;
  } catch (error) {
    return createApiResponse<undefined>({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};