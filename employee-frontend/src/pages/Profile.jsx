import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/auth/me");
      setUser(res.data);
    } catch (err) {
      toast.error("Error loading profile ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-8">No profile data</div>;
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-all duration-500">

    <div className="backdrop-blur-lg bg-white/60 dark:bg-white/10 border border-white/30 dark:border-white/20 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center text-white relative">

        <div className="w-24 h-24 mx-auto rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-xl transition-transform duration-300 hover:rotate-6 hover:scale-110">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-semibold mt-4 tracking-wide">
          {user.name}
        </h2>

        <p className="text-sm opacity-90">{user.email}</p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">Role</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
              user.role === "admin"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {user.role}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">Status</span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm font-semibold">
            Active
          </span>
        </div>

        {/* Buttons */}
        <div className="pt-4 space-y-3">

          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Change Password
          </button>

        </div>
      </div>
    </div>
  </div>
);
}
