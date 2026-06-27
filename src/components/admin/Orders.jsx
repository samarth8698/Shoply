import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, X, Search } from "lucide-react";
import {
  getOrders,
  updateOrder,
  deleteOrder,
} from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    email: "",
    phone: "",
    address: "",
    products: "",
    quantity: "",
    amount: "",
    paymentMethod: "",
    trackingId: "",
    status: "",
    orderDate: "",
  });

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

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleUpdateOrder = (order) => {
    setFormData(order);
    setShowUpdateModal(true);
  };

  const saveUpdatedOrder = async () => {
    try {
      await updateOrder(formData.id, formData);
      await fetchOrders();
      setShowUpdateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      await fetchOrders();
    } catch (error) {
      console.error(error);
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

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (o) => o.status === "Processing"
  ).length;

  const completedOrders = orders.filter(
    (o) =>
      o.status === "Completed" ||
      o.status === "Delivered"
  ).length;

    return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Orders
        </h1>

        <p className="mt-2 text-slate-500">
          Manage customer orders and deliveries
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Pending</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Processing</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {processingOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Completed</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completedOrders}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Orders..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Order ID
                </th>

                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-left">
                  Quantity
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t"
                >
                  <td className="px-6 py-4 font-medium">
                    #{order.id}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {order.customerName}
                      </p>

                      <p className="text-sm text-slate-500">
                        {order.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ₹{order.amount}
                  </td>

                  <td className="px-6 py-4">
                    {order.orderDate}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleViewOrder(order)
                        }
                        className="rounded-lg bg-blue-100 p-2 text-blue-600"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateOrder(order)
                        }
                        className="rounded-lg bg-purple-100 p-2 text-purple-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteOrder(order.id)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

            {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Order Details</h2>

              <button onClick={() => setShowViewModal(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Products:</strong> {selectedOrder.products}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
              <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Tracking ID:</strong> {selectedOrder.trackingId}</p>
              <p className="md:col-span-2">
                <strong>Address:</strong> {selectedOrder.address}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Update Order Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Update Order</h2>

              <button onClick={() => setShowUpdateModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerName: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
                placeholder="Customer Name"
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
                placeholder="Email"
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Out For Delivery</option>
                <option>Delivered</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

              <input
                type="text"
                value={formData.trackingId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trackingId: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
                placeholder="Tracking ID"
              />

              <button
                onClick={saveUpdatedOrder}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 font-semibold text-white"
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;