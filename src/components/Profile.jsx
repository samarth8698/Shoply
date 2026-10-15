import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const email = localStorage.getItem("userEmail");

const response = await axios.get(
  `http://localhost:8080/users/email/${email}`
);

setUser(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(
  `http://localhost:8080/users/${user.id}`,
  user
);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <img
            src="https://ui-avatars.com/api/?name=Samarth&background=7c3aed&color=fff&size=128"
            alt="Profile"
            className="mx-auto h-28 w-28 rounded-full"
          />

          <h1 className="mt-4 text-4xl font-bold text-violet-600">
            My Profile
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="font-semibold">Full Name</label>

            <input
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="font-semibold">Phone</label>

            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div className="pt-6">
            <button
              onClick={updateProfile}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-lg font-semibold text-white hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
