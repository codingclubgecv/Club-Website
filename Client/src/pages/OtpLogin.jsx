import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import "./OtpLogin.css"; // 👈 CSS file import

export default function OtpLogin() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const sendOtp = async () => {
    try {
      const res = await API.post("/auth/send-otp", { email });
      toast.success(res.data.message);
      setOtpSent(true);
      setOtp("");

      const { lastOtpSentAt, cooldown } = res.data;
      if (lastOtpSentAt && cooldown) {
        const timeElapsed = Math.floor(
          (Date.now() - new Date(lastOtpSentAt)) / 1000
        );
        const timeLeft = Math.max(cooldown - timeElapsed, 0);
        setCountdown(timeLeft);
      } else {
        setCountdown(0);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleAction = () => {
    if (otpSent) {
      verifyOtp();
    } else {
      sendOtp();
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <h2 className="otp-title">Login with OTP</h2>
        <p className="otp-subtitle">Secure one-time password login</p>

        <input
          className="otp-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />

        {otpSent && (
          <input
            className="otp-input"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        <button
          className={`otp-btn ${otpSent ? "primary" : "success"}`}
          onClick={handleAction}
          disabled={!email.trim() || (otpSent && !otp.trim())}
        >
          {otpSent
            ? "Verify OTP"
            : countdown > 0
            ? `Resend OTP in ${formatTime(countdown)}`
            : "Send OTP"}
        </button>

        {otpSent && countdown === 0 && (
          <button className="otp-resend" onClick={sendOtp}>
            Resend OTP
          </button>
        )}

        {otpSent && countdown > 0 && (
          <p className="otp-timer">
            You can resend OTP in {formatTime(countdown)}
          </p>
        )}

        <div className="otp-links">
          <Link to="/">Login with Password</Link>
          <span> | </span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
