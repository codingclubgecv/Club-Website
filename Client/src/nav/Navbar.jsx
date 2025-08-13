import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // <-- useNavigate hook yahan

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() => navigate("/")} // <-- ab kaam karega
        />
        <span className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLinks />
      </ul>

      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        <SearchBar />
        <AuthButtons />
      </div>
    </nav>
  );
}
