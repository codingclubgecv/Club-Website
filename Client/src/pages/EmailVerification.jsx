import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmailVerification.css";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}`
        );
        setStatus("✅ Your email has been verified successfully!");
        setVerified(true);
      } catch (err) {
        if (err.response?.data?.message) {
          setStatus(`❌ ${err.response.data.message}`);
        } else {
          setStatus("❌ Invalid or expired verification link.");
        }
        setVerified(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("❌ Verification token not found.");
    }
  }, [searchParams, navigate]);

  return (
    <div className="ev-page">
      <div className="ev-container">
        <h2 className={`ev-status ${verified ? "success" : "error"}`}>
          {status}
        </h2>

        {verified && (
          <button onClick={() => navigate("/")} className="ev-btn">
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
