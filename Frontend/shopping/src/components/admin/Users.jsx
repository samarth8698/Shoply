import { useState } from "react";
import { Eye, Trash2, UserPlus, X } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      status: "Active",
      joined: "12 Jun 2026",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "Customer",
      status: "Active",
      joined: "08 Jun 2026",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Admin",
      status: "Active",
      joined: "01 Jun 2026",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "Customer",
      status: "Inactive",
      joined: "28 May 2026",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@example.com",
      role: "Customer",
      status: "Active",
      joined: "20 May 2026",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
  });

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      joined: new Date().toLocaleDateString(),
    };

    setUsers([...users, user]);

    setNewUser({
      name: "",
      email: "",
      role: "Customer",
    });

    setShowModal(false);
  };

  const getStatusClass = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  const getRoleClass = (role) =>
    role === "Admin"
      ? "bg-violet-100 text-violet-700"
      : "bg-blue-100 text-blue-700";

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "Admin"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-slate-500">
            Manage users and permissions
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white"
        >
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-slate-500">Total Users</p>
          <h2 className="text-3xl font-bold">
            {users.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-slate-500">Active Users</p>
          <h2 className="text-3xl font-bold text-green-600">
            {activeUsers}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-slate-500">Admins</p>
          <h2 className="text-3xl font-bold text-violet-600">
            {adminUsers}
          </h2>
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
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-medium">
                        {user.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        ID #{user.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user.joined}
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
                      onClick={() =>
                        handleDelete(user.id)
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

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Add User
              </h2>

              <button
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              >
                <option>Customer</option>
                <option>Admin</option>
              </select>

              <button
                onClick={handleAddUser}
                className="w-full rounded-xl bg-violet-600 py-3 text-white"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                User Details
              </h2>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                <X />
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{" "}
                {selectedUser.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedUser.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {selectedUser.role}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.status}
              </p>

              <p>
                <strong>Joined:</strong>{" "}
                {selectedUser.joined}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;