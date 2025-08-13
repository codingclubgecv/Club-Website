import "./Navbar.css";

export default function SearchBar() {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search developers, problems, etc" />
      <button className="search-btn">🔍</button>
    </div>
  );
}
