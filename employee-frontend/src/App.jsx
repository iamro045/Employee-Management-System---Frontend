import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Profile from "./pages/Profile";
import EditEmployee from "./pages/EditEmployee";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout Routes */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/employees"
          element={
            <Layout>
              <Employees />
            </Layout>
          }
        />

        <Route
          path="/add-employee"
          element={
            <Layout>
              <AddEmployee />
            </Layout>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <Layout>
              <EditEmployee />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <Layout>
              <EditProfile />
            </Layout>
          }
        />

        <Route
          path="/change-password"
          element={
            <Layout>
              <ChangePassword />
            </Layout>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;