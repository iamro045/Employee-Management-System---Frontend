import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log("Error fetching employees");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees(); // refresh list
    } catch (err) {
      alert("Only admin can delete");
    }
  };

  const handleEdit = async (emp) => {
    const newName = prompt("Enter new name:", emp.name);
    const newDepartment = prompt("Enter new department:", emp.department);
    const newSalary = prompt("Enter new salary:", emp.salary);

    if (!newName || !newDepartment || !newSalary) return;

    try {
      await API.put(`/employees/${emp._id}`, {
        name: newName,
        department: newDepartment,
        salary: Number(newSalary),
      });

      fetchEmployees();
    } catch (err) {
      alert("Only admin can edit");
    }
  };

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
              <tr key={emp._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.department}</td>
                <td className="p-4">₹{emp.salary}</td>

                {role === "admin" && (
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
