import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { getOrders } from "../../services/orderService";

import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const productResponse = await getProducts();
      const orderResponse = await getOrders();

      setProducts(productResponse.data);
      setOrders(orderResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0,
  );

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
      value: "Coming Soon",
      icon: <Users size={28} />,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      icon: <IndianRupee size={28} />,
    },
  ];

  const recentOrders = [...orders].reverse().slice(0, 5);

  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 28000 },
    { month: "Jun", sales: 35000 },
  ];

  const userData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 700 },
    { month: "Mar", users: 1000 },
    { month: "Apr", users: 1400 },
    { month: "May", users: 1900 },
    { month: "Jun", users: 2450 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">Welcome back, Admin 👋</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>

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

      {/* Analytics Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Sales Overview</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">User Growth</h2>

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

          <button className="text-sm font-medium text-violet-600">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-none">
                  <td className="py-4 font-medium">#{order.id}</td>

                  <td>{order.customerName}</td>

                  <td>₹{order.amount}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
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
      </div>
    </div>
  );
};

export default Dashboard;
