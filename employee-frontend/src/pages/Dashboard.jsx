export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Employees</h2>
          <p className="text-3xl mt-2 font-bold text-blue-500">25</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Departments</h2>
          <p className="text-3xl mt-2 font-bold text-green-500">5</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Active Users</h2>
          <p className="text-3xl mt-2 font-bold text-purple-500">20</p>
        </div>
      </div>
    </div>
  );
}