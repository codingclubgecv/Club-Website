import React, { useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    try {
      await axios.put("/api/admin/update-profile", { name, email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated!");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <input
        type="text"
        placeholder="New Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        placeholder="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
}
