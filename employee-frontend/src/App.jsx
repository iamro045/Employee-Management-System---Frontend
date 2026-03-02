import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import EditEmployee from "./pages/EditEmployee";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile"; // 🔥 ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/profile" element={<Profile />} />
<Route path="/edit-profile" element={<EditProfile />} />
<Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
    
  );
}

export default App;
