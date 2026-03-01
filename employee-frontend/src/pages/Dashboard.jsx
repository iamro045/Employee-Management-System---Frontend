import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/employees/stats/summary");
      setStats(res.data);
    } catch (err) {
      console.log("Error fetching stats");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard 📊</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Employees</h2>
          <p className="text-3xl mt-2 font-bold text-blue-500">
            {stats.totalEmployees}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Departments</h2>
          <p className="text-3xl mt-2 font-bold text-green-500">
            {stats.totalDepartments}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">System Status</h2>
          <p className="text-3xl mt-2 font-bold text-purple-500">
            Active
          </p>
        </div>
      </div>
    </div>
  );
}