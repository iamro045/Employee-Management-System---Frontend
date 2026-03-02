import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [user, setUser] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await API.get("/auth/me");
    setUser(res.data);
  };

  const handleUpdate = async () => {
    try {
      await API.put("/auth/update-profile", { name: user.name });
      toast.success("Profile updated 🎉");
      setTimeout(() => navigate("/profile"), 1000);
    } catch {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
          Edit Profile
        </h2>

        <input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}