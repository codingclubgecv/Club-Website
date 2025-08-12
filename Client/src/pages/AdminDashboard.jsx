import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // stored after login

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get("/api/admin/pending-users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersArray = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

      setPendingUsers(usersArray);
    } catch (err) {
      console.error("Error fetching pending users:", err);
      setPendingUsers([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId) => {
    if (!window.confirm("Approve this user?")) return;
    try {
      await axios.put(
        `/api/admin/approve/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  const rejectUser = async (userId) => {
    if (!window.confirm("Reject and delete this user?")) return;
    try {
      await axios.delete(`/api/admin/reject/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>

      {pendingUsers.length === 0 ? (
        <p className="text-center text-gray-600">No pending users 🎉</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-bordered table-striped">
            <thead className="bg-gray-200">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Reg No.</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.registrationNo}</td>
                  <td>{user.branch}</td>
                  <td>{user.batch}</td>
                  <td>
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="rounded-full w-10 h-10 object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm mr-2"
                      onClick={() => approveUser(user._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => rejectUser(user._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
