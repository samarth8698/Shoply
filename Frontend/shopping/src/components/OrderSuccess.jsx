import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const orderId = "#" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <CheckCircle size={90} className="text-green-500" />

      <h1 className="mt-6 text-4xl font-bold">
        Order Placed Successfully!
      </h1>

      <p className="mt-3 text-slate-500">
        Thank you for shopping with Shoply.
      </p>

      <p className="mt-2 font-medium text-slate-700">
        Order ID: {orderId}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="rounded-xl bg-violet-600 px-6 py-3 text-white"
        >
          Continue Shopping
        </Link>

        <Link
          to="/my-orders"
          className="rounded-xl border border-slate-300 px-6 py-3"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;