import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";

export default function NavLinks() {
  const navigate = useNavigate();

  return (
    <>
      <NavItem label="PRACTICE" onClick={() => navigate("/")} />
      <NavItem
        label="EVENTS"
        isBold={true}
        onClick={() => navigate("/events")}
      />
      <NavItem label="ABOUT" onClick={() => navigate("/about")} />
      <NavItem label="LEADERBOARD" onClick={() => navigate("/")} />
    </>
  );
}
