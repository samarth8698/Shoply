import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { getOrders } from "../../services/orderService";
import { getUsers } from "../../services/userService";

import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const productResponse = await getProducts();
      const orderResponse = await getOrders();
      const userResponse = await getUsers();

      setProducts(productResponse.data);
      setOrders(orderResponse);
      setUsers(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Dashboard Calculations
  // ===========================

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) => Number(product.quantity) <= 5
  );

  const pendingOrders = orders.filter(
    (order) =>
      order.status &&
      order.status.toLowerCase() === "pending"
  );

  // ===========================
  // Dynamic Sales Data
  // ===========================

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlySales = {};

  orders.forEach((order) => {
  if (!order.orderDate) return;

  let parts;

  if (order.orderDate.includes("/")) {
    parts = order.orderDate.split("/");
  } else if (order.orderDate.includes("-")) {
    parts = order.orderDate.split("-");
  } else {
    return;
  }

  if (parts.length !== 3) return;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) return;

  const monthName = monthNames[date.getMonth()];

  monthlySales[monthName] =
    (monthlySales[monthName] || 0) + Number(order.amount || 0);
});

  const salesData = monthNames.map((month) => ({
    month,
    sales: monthlySales[month] || 0,
  }));

  const userData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 700 },
    { month: "Mar", users: 1000 },
    { month: "Apr", users: 1400 },
    { month: "May", users: 1900 },
    { month: "Jun", users: 2450 },
  ];

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Package size={28} />,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCart size={28} />,
    },
    {
      title: "Total Users",
      value: users.length,
      icon: <Users size={28} />,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      icon: <IndianRupee size={28} />,
    },
    {
      title: "Low Stock",
      value: lowStockProducts.length,
      icon: <AlertTriangle size={28} />,
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      icon: <Clock3 size={28} />,
    },
  ];

  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="space-y-8">
  {/* Header */}
  <div>
    <h1 className="text-3xl font-bold text-slate-900">
      Dashboard
    </h1>

    <p className="mt-2 text-slate-500">
      Welcome back, Admin 👋
    </p>
  </div>

  {/* Stats Cards */}
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
    {stats.map((stat) => (
      <div
        key={stat.title}
        className="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </div>

          <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
            {stat.icon}
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Analytics */}
  <div className="grid gap-6 lg:grid-cols-2">

    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Sales Overview
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#7C3AED"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        User Growth
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#7C3AED"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>
    {/* Recent Orders */}
  <div className="rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-semibold">Recent Orders</h2>

      <button className="text-sm font-medium text-violet-600 hover:text-violet-700">
        View All
      </button>
    </div>

    {recentOrders.length === 0 ? (
      <div className="py-10 text-center text-slate-500">
        No Orders Found
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-slate-600">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Payment</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-none hover:bg-slate-50"
              >
                <td className="py-4 font-semibold">
                  #{order.id}
                </td>

                <td>{order.customerName}</td>

                <td>
                  ₹{Number(order.amount || 0).toLocaleString()}
                </td>

                <td>{order.paymentMethod || "-"}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
  );
};

export default Dashboard;