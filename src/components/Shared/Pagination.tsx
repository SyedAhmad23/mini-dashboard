import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentPage } from "../../features/products/productSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.products,
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8 animate-fade-in">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 rounded-xl cursor-pointer border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => dispatch(setCurrentPage(i + 1))}
            className={`w-10 h-10 cursor-pointer rounded-xl font-bold transition-all ${
              currentPage === i + 1
                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl cursor-pointer border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
