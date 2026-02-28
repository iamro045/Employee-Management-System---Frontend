import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">EMS</h1>

      {token && (
        <div className="flex gap-6 items-center">
          <Link className="hover:text-blue-400" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-blue-400" to="/employees">Employees</Link>
          <Link className="hover:text-blue-400" to="/profile">Profile</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}