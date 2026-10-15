import { useState, useEffect } from "react";
import { Eye, Trash2, X } from "lucide-react";
import { getUsers, deleteUser } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await deleteUser(id);

    fetchUsers();

    alert("User Deleted Successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to Delete User");
  }
};

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const getStatusClass = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  const getRoleClass = (role) =>
  role === "ADMIN"
    ? "bg-violet-100 text-violet-700"
    : "bg-blue-100 text-blue-700";

  const activeUsers = users.filter((user) => user.enabled).length;

  const adminUsers = users.filter((user) => user.role === "ADMIN").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-slate-500">Manage users and permissions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-slate-500">Total Users</p>
          <h2 className="text-3xl font-bold">{users.length}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-slate-500">Active Users</p>
          <h2 className="text-3xl font-bold text-green-600">{activeUsers}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-slate-500">Admins</p>
          <h2 className="text-3xl font-bold text-violet-600">{adminUsers}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                      {user.fullName?.charAt(0) || "U"}
                    </div>

                    <div>
                      <h3 className="font-medium">{user.fullName}</h3>

                      <p className="text-sm text-slate-500">ID #{user.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleClass(
                      user.role,
                    )}`}
                  >
                    {user.role === "USER" ? "Customer" : "Admin"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.enabled ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user.joinedDate
                    ? new Date(user.joinedDate).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleView(user)}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
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

      {/* View Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">User Details</h2>

              <button onClick={() => setSelectedUser(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {selectedUser.fullName}
              </p>

              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {selectedUser.role === "USER" ? "Customer" : "Admin"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.enabled ? "Active" : "Inactive"}
              </p>

              <p>
                <strong>Joined:</strong>{" "}
                {selectedUser.joinedDate
                  ? new Date(selectedUser.joinedDate).toLocaleString("en-GB")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
