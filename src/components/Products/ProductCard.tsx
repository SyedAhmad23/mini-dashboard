import React from "react";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
      {/* Perfectly uniform aspect ratio image container */}
      <div className="relative bg-slate-50 w-full pt-[100%] overflow-hidden">
        <div className="absolute inset-0 p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Clean, minimalist content block */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded-sm uppercase tracking-widest truncate max-w-[60%]">
            {product.category}
          </p>
          <div className="flex items-center gap-1 bg-slate-50 text-slate-600 px-2 py-1 rounded-md">
            <span className="text-xs font-bold">★ {product.rating?.rate}</span>
          </div>
        </div>

        <h3 className="text-[15px] font-semibold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.title}
        </h3>
        
        {/* Very subtle secondary text to give depth without cluttering */}
        <p className="text-sm text-slate-500 line-clamp-1 mb-6">
          {product.description}
        </p>

        {/* Minimalist Price & Action block */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div className="flex flex-col">
            <p className="text-xl font-black text-slate-900 tracking-tight">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button className="h-10 px-5 bg-slate-900 text-white text-sm font-semibold rounded-full flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-md shadow-slate-900/10">
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
