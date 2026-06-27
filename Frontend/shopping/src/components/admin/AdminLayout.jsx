import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Menu,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-5">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Admin Panel</h1>
          )}

          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={22} />
          </button>
        </div>

        <nav className="mt-5 flex flex-col gap-2 px-3">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {menu.icon}
              {sidebarOpen && <span>{menu.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <button>
              <Bell size={20} />
            </button>

            <div className="flex items-center gap-2">
              <UserCircle size={28} />
              <span className="font-medium">Admin</span>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;