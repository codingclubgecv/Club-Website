import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/all-users", {
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

  // Approve user
  const handleApprove = async (userId) => {
    if (!window.confirm("Are you sure you want to approve this user?")) return;
    try {
      await axios.put(`/api/admin/approve/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error approving user");
    }
  };

  // Reject user
  const handleReject = async (userId) => {
    if (!window.confirm("Are you sure you want to reject & delete this user?")) return;
    try {
      await axios.delete(`/api/admin/reject/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error rejecting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Stats */}
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

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Users Table */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-striped table-bordered">
            <thead className="bg-gray-200">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Reg No</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user._id}
                  className={!user.adminVerified ? "bg-yellow-100" : ""}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.registrationNo}</td>
                  <td>{user.branch}</td>
                  <td>{user.batch}</td>
                  <td>
                    {user.adminVerified ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-bold">No</span>
                    )}
                  </td>
                  <td>
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
  );
};

export default AdminDashboard;