import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      await API.put("/api/auth/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully 🔐");

      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      toast.error(
        err.response?.data?.error || "Password change failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-6 text-center dark:text-white">
          Change Password 🔐
        </h2>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 mb-6 rounded"
        />

        <button
          onClick={handleChangePassword}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
