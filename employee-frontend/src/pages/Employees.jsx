import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const role = localStorage.getItem("role");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/employees"); // FIXED
      setEmployees(res.data);
    } catch (err) {
      toast.error("Error fetching employees ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/employees/${id}`); // FIXED
      toast.success("Employee Deleted 🗑️");
      fetchEmployees();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // 🔎 Filter employees
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Employees
      </h1>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg w-72"
        />

        {role === "admin" && (
          <Link
            to="/add-employee"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + Add Employee
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Department</th>
                <th className="p-4 text-right">Salary</th>
                {role === "admin" && (
                  <th className="p-4 text-right">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map((emp) => (
                <tr
                  key={emp._id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {emp.name}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
                      {emp.department}
                    </span>
                  </td>

                  <td className="p-4 text-right font-semibold">
                    ₹{emp.salary.toLocaleString()}
                  </td>

                  {role === "admin" && (
                    <td
                      className="p-4 text-right space-x-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={`/edit-employee/${emp._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}

              {currentEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Drawer */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
          <div className="w-[420px] bg-white h-full shadow-2xl p-6 overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Employee Profile
              </h2>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 border-b pb-6">

              <div>
                <label className="text-sm text-gray-500">Name</label>
                <input
                  type="text"
                  value={selectedEmployee.name}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Department
                </label>
                <input
                  type="text"
                  value={selectedEmployee.department}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      department: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Salary</label>
                <input
                  type="number"
                  value={selectedEmployee.salary}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      salary: Number(e.target.value),
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Role</label>
                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEmployee.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {selectedEmployee.role || "Employee"}
                  </span>
                </div>
              </div>

              {role === "admin" && (
                <label className="flex items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    checked={selectedEmployee.departmentManager}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        departmentManager: e.target.checked,
                      })
                    }
                  />
                  Department Manager
                </label>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold mb-3">
                Activity Logs
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div>Profile updated • 2 days ago</div>
                <div>Salary modified • 5 days ago</div>
                <div>Created account • 1 month ago</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
