import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardHome() {
  const [admin, setAdmin] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/admin/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAdmin(res.data))
    .catch(err => console.error(err));
  }, [token]);

  if (!admin) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {admin.name}</h1>
      <p>Email: {admin.email}</p>
      <p>Role: {admin.role}</p>
    </div>
  );
}
