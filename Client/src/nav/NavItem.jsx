export default function NavItem({ label, isBold = false, onClick }) {
  return (
    <li style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      {isBold ? <strong>{label}</strong> : label}
    </li>
  );
}
