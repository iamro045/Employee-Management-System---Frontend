import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const departments = [
    "HR",
    "IT",
    "Finance",
    "Marketing",
    "Operations",
    "Developer",
  ];

  const handleSubmit = async () => {
    if (!name || !department || !salary) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/employees", {
        name,
        department,
        salary: Number(salary),
      });

      toast.success("Employee Added 🎉");

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    } catch (err) {
      toast.error("Error adding employee ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Employee 👤
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Department Dropdown */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Salary */}
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setSalary(e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </div>
    </div>
  );
}
