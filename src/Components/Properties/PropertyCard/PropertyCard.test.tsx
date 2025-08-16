import { render, screen } from "@testing-library/react";
import PropertyCard from "./PropertyCard";
import { PropertyListDto } from "../../../utils/interface";

const mockProperty: PropertyListDto = {
  id: "123",
  ownerName: "",
  name: "Casa Bonita",
  address: "Calle 123",
  price: 150000,
  image: "https://example.com/casa.jpg",
};

describe("PropertyCard", () => {
  it("renders property info correctly", () => {
    render(<PropertyCard p={mockProperty} />);

    expect(screen.getByText("Casa Bonita")).toBeInTheDocument();
    expect(screen.getByText("Calle 123")).toBeInTheDocument();
    expect(screen.getByText("$150.000")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockProperty.image);
    expect(img).toHaveAttribute("alt", mockProperty.name);

    const link = screen.getByRole("link", { name: /ver detalles/i });
    expect(link).toHaveAttribute("href", "/properties/123");
  });

  it("uses placeholder image when no image is provided", () => {
    const propertyWithoutImage: PropertyListDto = {
      ...mockProperty,
      image: undefined,
    };

    render(<PropertyCard p={propertyWithoutImage} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/placeholder.png");
  });
});
