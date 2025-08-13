import { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ⬅️ Import Context
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅️ Context se login function

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token); // ⬅️ Context update + localStorage save
      toast.success("Login successful");
<<<<<<< HEAD
      navigate("/profile");
=======
      navigate("/"); // ⬅️ Login ke baad home page
>>>>>>> f6db1ad2ca53e69e3beac3e7b1244e94612fe260
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Login with your credentials</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="form-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span> | </span>
            <Link to="/otp-login">Login with OTP</Link>
            <span> | </span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
