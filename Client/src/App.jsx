import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OtpLogin from "./pages/OtpLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/EmailVerification";
import AdminLogin from "./pages/AdminLogin";
<<<<<<< HEAD
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DashboardHome from "./pages/Admin/DashboardHome";
import UserList from "./pages/Admin/UserList";
import AdminProfile from "./pages/Admin/AdminProfile";
import Navbar from "./nav/Navbar";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import EventPage from "./pages/EventPage";
import LeadsPage from "./About/LeadsSection";
=======
import AdminDashboard from "./pages/AdminDashboard";
>>>>>>> dbeffd83cc079aa6ff9326533395cb54ffb6de65

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
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/leaderboard" element={<LeadsPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
