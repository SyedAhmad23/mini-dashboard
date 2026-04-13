import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { setSearchTerm, setSortBy } from "../../features/products/productSlice";
import { useDebounce } from "../../hooks/useDebounce";

const Controls = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.products);
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-8 animate-fade-in">
      {/* Search Input */}
      <div className="relative w-full md:flex-grow">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search for premium products..."
          className="input-field !pl-12 h-14 text-lg shadow-sm"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Sort Select */}
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <ArrowUpDown className="h-4 w-4 text-slate-400" />
        </div>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="input-field pl-10 h-14 appearance-none cursor-pointer bg-white"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="!cursor-pointer"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default Controls;
