import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-blue-400">User List</Link>
        <Link to="/admin/profile" className="hover:text-blue-400">Update Profile</Link>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
