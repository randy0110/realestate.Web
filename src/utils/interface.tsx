
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
}

export interface PagedApiResponse<T> {
  success: boolean;
  message: string;
  total: number;
  page: number;
  pageSize: number;
  result: T;
}

export interface PropertyListDto {
  id: string;
  ownerName: string;
  name: string;
  address: string;
  price: number;
  image?: string | null;
};

export interface GetByIdPropertiesDto {
  id: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  owner: OwnerDto;
  images: PropertyImageDto[];
  traces: PropertyTraceDto[];
}

export interface OwnerDto {
  name: string;
  address: string;
  photo: string;
  birthday: string; // Si necesitas manejarlo como Date, puedes usar Date
}

export interface PropertyImageDto {
  file: string;
  enabled: boolean;
}

export interface PropertyTraceDto {
  dateSale: string; // o Date si lo manejas como fecha
  name: string;
  value: number;
  tax: number;
}
