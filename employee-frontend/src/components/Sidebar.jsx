import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-100 flex flex-col p-6">

      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        HR Portal
      </h1>

      <nav className="flex flex-col gap-3">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`
          }
        >
          Profile
        </NavLink>

      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}