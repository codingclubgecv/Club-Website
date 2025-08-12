import { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-container">
        <h2 className="fp-title">Forgot Password</h2>
        <p className="fp-subtitle">
          Enter your registered email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="fp-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="fp-btn" type="submit">
            Send Reset Link
          </button>
          <div className="fp-links">
            <Link to="/">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
