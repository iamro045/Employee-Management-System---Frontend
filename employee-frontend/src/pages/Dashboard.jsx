import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch {
      toast.error("Error loading dashboard");
    }
  };

  const departmentData = Object.values(
    employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = {
          department: emp.department,
          count: 0,
        };
      }
      acc[emp.department].count += 1;
      return acc;
    }, {})
  );

  const totalPayroll = employees.reduce(
    (sum, emp) => sum + emp.salary,
    0
  );

  const avgSalary =
    employees.length > 0
      ? Math.round(totalPayroll / employees.length)
      : 0;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        HR Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Employees</p>
          <h2 className="text-2xl font-bold mt-2">
            {employees.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Payroll</p>
          <h2 className="text-2xl font-bold mt-2">
            ₹{totalPayroll.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Average Salary</p>
          <h2 className="text-2xl font-bold mt-2">
            ₹{avgSalary.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Department Chart */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Employees per Department
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1f2937" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 