import "./Navbar.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

export default function AuthButtons() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="auth-buttons">
      {isLoggedIn ? (
        <Button
          label={<FaUserCircle size={22} style={{ verticalAlign: "middle" }} />}
          className="profile-btn"
          onClick={() => navigate("/dashboard")}
        />
      ) : (
        <>
          <Button
            label="LOGIN"
            className="login-btn"
            onClick={() => navigate("/login")}
          />
          <Button
            label="SIGN UP"
            className="signup-btn"
            onClick={() => navigate("/register")}
          />
        </>
      )}
    </div>
  );
}
