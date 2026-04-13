import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/Products/ProductCard";
import Controls from "../components/Shared/Controls";
import LoadingSpinner from "../components/Layout/LoadingSpinner";
import ErrorMessage from "../components/Layout/ErrorMessage";
import Pagination from "../components/Shared/Pagination";
import { LayoutGrid, PackageSearch } from "lucide-react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, status, error, currentPage, itemsPerPage } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
          Product Listing Page
        </h2>
        <p className="text-slate-500 font-medium">
          Browse through our curated list of high-quality products.
        </p>
      </div>

      <Controls />

      {status === "loading" ? (
        <LoadingSpinner />
      ) : status === "failed" ? (
        <ErrorMessage
          message={error || "Failed to fetch products"}
          onRetry={handleRetry}
        />
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <PackageSearch className="w-20 h-20 text-slate-200 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">
            No products found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search criteria or clear filters.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary-600" />
              <span className="font-bold text-slate-700">
                Displaying {filteredItems.length} Products
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination />
        </>
      )}
    </>
  );
};

export default Dashboard;
