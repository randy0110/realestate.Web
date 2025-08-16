import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters component", () => {
  it("should call onChange with entered values when submitting", () => {
    const handleChange = jest.fn();

    render(<Filters onChange={handleChange} />);

    // Escribimos valores en los campos
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Casa Bonita" },
    });
    fireEvent.change(screen.getByPlaceholderText("Dirección"), {
      target: { value: "Calle 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Precio min"), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Precio max"), {
      target: { value: "5000" },
    });

    // Enviar formulario
    fireEvent.click(screen.getByText("buscar"));

    expect(handleChange).toHaveBeenCalledWith({
      name: "Casa Bonita",
      address: "Calle 123",
      priceMin: 1000,
      priceMax: 5000,
    });
  });

  it("should send undefined for empty fields", () => {
    const handleChange = jest.fn();

    render(<Filters onChange={handleChange} />);

    fireEvent.click(screen.getByText("buscar"));

    expect(handleChange).toHaveBeenCalledWith({
      name: undefined,
      address: undefined,
      priceMin: undefined,
      priceMax: undefined,
    });
  });
});
