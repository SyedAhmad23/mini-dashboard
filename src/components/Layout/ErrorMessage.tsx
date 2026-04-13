import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center glass-card rounded-2xl border-red-100 max-w-lg mx-auto">
      <div className="p-4 bg-red-50 rounded-full mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-slate-600 mb-6">
        {message || "We couldn't load the products. Please try again later."}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white rounded-xl font-medium transition-all hover:bg-slate-900 active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
