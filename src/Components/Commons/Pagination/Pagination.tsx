import React from "react";
import { ArrowLeft, ArrowRight  } from 'lucide-react';
interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // No mostrar si solo hay una página

  var inc = currentPage <= 3 || totalPages <=5 ? 1 : currentPage > totalPages - 2 ? totalPages - 4 : currentPage - 2;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        data-testid="prev-button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center gap-4"
      >
      <ArrowLeft size={24} />
      </button>

      {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, i) => (
        <button
          key={i + inc}
          onClick={() => goToPage(i + inc)}
          className={`px-3 py-1 rounded  ${
            currentPage === i + inc ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i + inc}
        </button>
      ))}

      <button
        data-testid="next-button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center gap-4"
      >
      <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
