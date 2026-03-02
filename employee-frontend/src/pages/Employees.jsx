import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      toast.error("Error fetching employees ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      toast.success("Employee Deleted 🗑️");
      fetchEmployees();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // 🔎 Filter first
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Then paginate filtered data
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>

        {role === "admin" && (
          <Link
            to="/add-employee"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Employee
          </Link>
        )}
      </div>

      {/* 🔎 Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        className="border p-2 rounded w-64 mb-4"
      />

      {/* 📋 Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Salary</th>
                {role === "admin" && <th className="p-4">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{emp.name}</td>
                  <td className="p-4">{emp.department}</td>
                  <td className="p-4">₹{emp.salary}</td>

                  {role === "admin" && (
                    <td className="p-4 space-x-2">
                      <Link
                        to={`/edit-employee/${emp._id}`}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

      {/* 📄 Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}