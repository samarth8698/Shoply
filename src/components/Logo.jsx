import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = ({ showTagline = true }) => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg">
        <ShoppingBag size={24} className="text-white" />
      </div>

      <div>
        <h1 className="text-3xl font-extrabold leading-none text-slate-900">
          Shoply
        </h1>

        {showTagline && (
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
            Premium Shopping Experience
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;