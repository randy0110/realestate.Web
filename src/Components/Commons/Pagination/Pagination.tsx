import React from "react";

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
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ⬅ Prev
      </button>

      {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, i) => (
        <button
          key={i + inc}
          onClick={() => goToPage(i + inc)}
          className={`px-3 py-1 rounded ${
            currentPage === i + inc ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i + inc}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next ➡
      </button>
    </div>
  );
};

export default Pagination;
