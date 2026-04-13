import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="p-2.5 bg-primary-600 rounded-xl shadow-lg shadow-primary-500/20">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              MINI DASHBOARD
            </h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors"
          >
            Marketplace
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold btn-primary text-slate-500 hover:text-primary-600 transition-colors"
          >
            Create Account
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
