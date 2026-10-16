import { Eye } from "lucide-react";
import {
  getOrders,
  updateOrder,
  deleteOrder,
} from "../services/orderService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (order) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      const updatedOrder = {
        ...order,
        status: "Cancelled",
      };

      await updateOrder(order.id, updatedOrder);

      await fetchOrders();

      alert("Order Cancelled Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Cancel Order");
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      await fetchOrders();

      alert("Order Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Delete Order");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-slate-500">
                    Ordered on {order.orderDate}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-6 rounded-2xl bg-slate-50 p-6">
                <h3 className="mb-4 font-semibold">
                  Products
                </h3>

                <ul>
                  <li>• {order.products}</li>
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-slate-500">Items</p>
                  <h3 className="text-3xl font-bold">
                    {order.quantity}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500">
                    Total Amount
                  </p>

                  <h3 className="text-3xl font-bold">
                    ₹{order.amount}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500">Status</p>

                  <h3 className="text-3xl font-bold">
                    {order.status}
                  </h3>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "selectedOrder",
                      JSON.stringify(order)
                    );

                    navigate("/track-order");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
                >
                  <Eye size={18} />
                  View Details
                </button>

                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order)}
                    className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}

                {order.status === "Cancelled" && (
                  <button
                    onClick={() =>
                      handleDeleteOrder(order.id)
                    }
                    className="rounded-xl bg-gray-800 px-5 py-3 text-white hover:bg-black"
                  >
                    Delete Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;