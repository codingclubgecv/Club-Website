import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OtpLogin from "./pages/OtpLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/EmailVerification";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DashboardHome from "./pages/Admin/DashboardHome";
import UserList from "./pages/Admin/UserList";
import AdminProfile from "./pages/Admin/AdminProfile";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    window.location.href = "/admin";
    return null;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/otp-login" element={<OtpLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* Nested routes inside AdminDashboard */}
          <Route index element={<DashboardHome />} /> {/* Default */}
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
