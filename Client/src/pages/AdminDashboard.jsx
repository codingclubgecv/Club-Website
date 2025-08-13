import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    } else {
      fetchUsers();
    }
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/admin/all-users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setPendingCount(data.pendingCount);
      } else {
        setError(data.message || "Failed to load users");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    if (!window.confirm("Are you sure you want to approve this user?")) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error approving user");
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm("Are you sure you want to reject & delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/reject/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error rejecting user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar / Navbar */}
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          <li><button onClick={() => navigate("/admin/dashboard")} className="w-full text-left hover:underline">Dashboard</button></li>
          <li><button onClick={() => navigate("/admin/profile")} className="w-full text-left hover:underline">Profile</button></li>
          <li><button onClick={() => navigate("/admin/settings")} className="w-full text-left hover:underline">Settings</button></li>
          <li><button onClick={handleLogout} className="w-full text-left text-red-400 hover:text-red-200">Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="flex gap-4 mb-4">
          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h2 className="text-lg">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded shadow">
            <h2 className="text-lg">Pending Approvals</h2>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Reg No</th>
                  <th className="px-4 py-2">Branch</th>
                  <th className="px-4 py-2">Batch</th>
                  <th className="px-4 py-2">Verified</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className={!user.adminVerified ? "bg-yellow-100" : ""}>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.registrationNo}</td>
                    <td className="px-4 py-2">{user.branch}</td>
                    <td className="px-4 py-2">{user.batch}</td>
                    <td className="px-4 py-2">
                      {user.adminVerified ? (
                        <span className="text-green-600 font-bold">Yes</span>
                      ) : (
                        <span className="text-red-600 font-bold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!user.adminVerified ? (
                        <>
                          <button
                            onClick={() => handleApprove(user._id)}
                            className="btn btn-success btn-sm mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500">No Actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;