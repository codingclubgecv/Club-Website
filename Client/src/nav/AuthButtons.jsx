import "./Navbar.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="auth-buttons">
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
    </div>
  );
}
