import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await API.post("/admin/login", { ...form });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.admin.role); // <-- fix here
    localStorage.setItem("adminEmail", res.data.admin.email);
    localStorage.setItem("adminName", res.data.admin.name);

    toast.success("Admin login successful");
    navigate("/admin/dashboard");
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6">
        <input
          className="form-control my-2"
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn btn-dark">Login as Admin</button>
      </form>
    </div>
  );
}
