import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await API.get("/employees");
      const found = res.data.find((emp) => emp._id === id);
      if (found) setEmployee(found);
    } catch (err) {
      console.log("Error loading employee");
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/employees/${id}`, employee);

      toast.success("Employee Updated ✅");

      setTimeout(() => {
        navigate("/employees");
      }, 1000);

    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Employee ✏️
        </h2>

        <input
          type="text"
          value={employee.name}
          onChange={(e) =>
            setEmployee({ ...employee, name: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="text"
          value={employee.department}
          onChange={(e) =>
            setEmployee({ ...employee, department: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="number"
          value={employee.salary}
          onChange={(e) =>
            setEmployee({ ...employee, salary: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
}