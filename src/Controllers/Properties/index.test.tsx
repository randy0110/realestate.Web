import { getList, getById } from "./index";
import apiClient from "../../Services/HttpClient";
import { createApiResponse, createPagedApiResponse } from "../../utils/CommonFunctions";
import { ApiResponse, GetByIdPropertiesDto, PagedApiResponse, PropertyListDto } from "../../utils/interface";

jest.mock("../../Services/HttpClient"); // mock de axios wrapper
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("PropertiesController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getList", () => {
    it("✅ retorna data cuando la petición es exitosa", async () => {
      const fakeResponse: PagedApiResponse<PropertyListDto[]> = {
        success: true,
        message: "ok",
        total: 1,
        page: 1,
        pageSize: 10,
        result: [{ id: "1", name: "Casa Bonita", ownerName: "Juan Pérez", address: "Calle 123", price: 50000, image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c" }],
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: fakeResponse });

      const result = await getList({ page: 1, pageSize: 10 });

      expect(result).toEqual(fakeResponse);
      expect(mockedApiClient.get).toHaveBeenCalledWith(
        "/api/Properties/List",
        { params: { page: 1, pageSize: 10 } }
      );
    });

    it("❌ retorna error formateado cuando la petición falla", async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error("Network error"));

      const result = await getList({ page: 1, pageSize: 10 });

      expect(result).toEqual(
        createPagedApiResponse<undefined>({ message: "Network error" })
      );
    });
  });

  describe("getById", () => {
    it("✅ retorna data cuando la petición es exitosa", async () => {
      const fakeResponse: ApiResponse<GetByIdPropertiesDto> = {
        success: true,
        message: "ok",
        result: { id: "1", name: "Casa Bonita", address: "Calle 123", price: 50000, codeInternal: "PROP004", year: 2021, owner: { name: "Juan Pérez",
      address: "Transversal 80, Medellín, Colombia",
      photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
      birthday: "1997-02-13" }, images: [], traces: [
      {
        dateSale: "2021-08-29",
        name: "Venta Inicial",
        value: 179626729,
        tax: 18764277
      },
      {
        dateSale: "2024-05-03",
        name: "Reventa",
        value: 626941818,
        tax: 21069645
      }
    ] }
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: fakeResponse });

      const result = await getById("1");

      expect(result).toEqual(fakeResponse);
      expect(mockedApiClient.get).toHaveBeenCalledWith("/api/Properties/1");
    });

    it("❌ retorna error formateado cuando la petición falla", async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error("Not Found"));

      const result = await getById("123");

      expect(result).toEqual(
        createApiResponse<undefined>({ message: "Not Found" })
      );
    });
  });
});
