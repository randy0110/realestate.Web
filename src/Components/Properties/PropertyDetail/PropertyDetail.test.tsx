import { render, screen, waitFor } from "@testing-library/react";
import PropertyDetail from "./PropertyDetail";
import { useParams } from "react-router-dom";
import { getById } from "../../../Controllers/Properties";
import { useLoading } from "../../../Context/LoadingContext/LoadingContext";


// 🔹 Mock de useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

// 🔹 Mock de getById
jest.mock("../../../Controllers/Properties", () => ({
  getById: jest.fn(),
}));

// 🔹 Mock del LoadingContext
jest.mock("../../../Context/LoadingContext/LoadingContext", () => ({
  useLoading: jest.fn(),
}));

describe("PropertyDetail", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (useLoading as jest.Mock).mockReturnValue({ setLoading: jest.fn() });
  });

  it("no renderiza nada si no hay data", async () => {
    (getById as jest.Mock).mockResolvedValue({ success: true, result: null });

    render(<PropertyDetail />);

    await waitFor(() => {
      expect(screen.queryByText(/Precio/i)).not.toBeInTheDocument();
    });
  });

  it("renderiza los datos de la propiedad", async () => {
    (getById as jest.Mock).mockResolvedValue({
      success: true,
      result: {
        id: "123",
        name: "Casa de Prueba",
        address: "Calle Falsa 123",
        price: 200000,
        year: 2021,
        codeInternal: "INT-001",
        images: [{ file: "/img.jpg", enabled: true }],
        owner: {
          name: "Juan Pérez",
          address: "Barrio Centro",
          birthday: "1990-01-01",
          photo: "/owner.jpg",
        },
        traces: [
          { dateSale: "2023-01-01", name: "Venta 1", value: 150000, tax: 5000 },
        ],
      },
    });

    render(<PropertyDetail />);

    // Verifica que se rendericen los datos
    expect(await screen.findByText("Casa de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Calle Falsa 123")).toBeInTheDocument();
    expect(screen.getByText("$200.000")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("INT-001")).toBeInTheDocument();
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Venta 1")).toBeInTheDocument();
  });

  it("no renderiza imágenes si están vacías", async () => {
    (getById as jest.Mock).mockResolvedValue({
      success: true,
      result: {
        id: "124",
        name: "Propiedad sin imágenes",
        address: "Otra calle 456",
        price: 100000,
        year: 2018,
        codeInternal: "INT-002",
        images: [],
        owner: null,
        traces: [],
      },
    });

    render(<PropertyDetail />);

    expect(await screen.findByText("Propiedad sin imágenes")).toBeInTheDocument();
    expect(screen.getByAltText(/Property image/i)).toHaveAttribute("src", "/placeholder.png");
  });
});
