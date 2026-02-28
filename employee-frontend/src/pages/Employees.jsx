import { Link } from "react-router-dom";

export default function Employees() {
  const role = localStorage.getItem("role");

  const employees = [
    { id: 1, name: "Rohit Sharma", department: "IT", salary: 50000 },
    { id: 2, name: "Amit Patil", department: "HR", salary: 45000 },
    { id: 3, name: "Sneha Joshi", department: "Finance", salary: 60000 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>

        {/* Show Add button only if admin */}
        {role === "admin" && (
          <Link
            to="/add-employee"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Employee
          </Link>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
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
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.department}</td>
                <td className="p-4">₹{emp.salary}</td>

                {role === "admin" && (
                  <td className="p-4 space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}