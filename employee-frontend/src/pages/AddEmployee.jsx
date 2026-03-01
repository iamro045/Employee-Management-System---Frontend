import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/employees", {
        name,
        department,
        salary: Number(salary),
      });

      alert("Employee Added Successfully 🎉");
      navigate("/employees");

    } catch (err) {
      alert("Only admin can add employees");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Employee 👤
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setSalary(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
}