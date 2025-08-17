import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  test("deshabilita el botón Prev en la primera página", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByTestId("prev-button")).toBeDisabled();
  });

  test("llama a onPageChange al hacer click en Next", () => {
    const mockFn = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockFn} />);
    fireEvent.click(screen.getByTestId("next-button"));
    expect(mockFn).toHaveBeenCalledWith(2);
  });
});