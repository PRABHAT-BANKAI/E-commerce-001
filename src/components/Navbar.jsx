import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import image from "../assets/main.png";

// Helper: Get initials
const getInitials = (firstName, lastName, fullName) => {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) return firstName[0].toUpperCase();
  if (fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return "";
};

// Helper: Random background color with text color
const getRandomBgColor = () => {
  const colors = [
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-red-500 text-white",
    "bg-purple-500 text-white",
    "bg-yellow-500 text-black",
    "bg-pink-500 text-white",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Navbar = ({ onSearch }) => {
  const [user, setUser] = useState(null);
  const [bgColor, setBgColor] = useState("bg-gray-500 text-white");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Example: fetch user (from json-server)
    fetch("http://localhost:3000/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setBgColor(getRandomBgColor());
      });
  }, []);

  const handleLogout = () => {
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value); // Pass search value to parent (like Product page)
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <Link to="/product" className="flex items-center">
        <img src={image} alt="logo" className="w-28 h-auto" />
      </Link>

      {/* 🔍 Search Bar */}
      <div className="flex items-center border rounded-lg px-3 py-1 w-1/2 max-w-md bg-gray-50">
        <IoMdSearch className="text-gray-500 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6 relative">
        <FaShoppingCart className="text-xl text-gray-700 hover:text-blue-600 cursor-pointer" />

        {/* Profile Avatar if logged in */}
        {user ? (
          <div className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ${bgColor}`}
            >
              {getInitials(user.firstName, user.lastName, user.name)}
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // ✅ Show signup/login button depending on page
          <>
            {location.pathname === "/" ? (
              <Link to="/signup">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Signup
                </button>
              </Link>
            ) : location.pathname === "/signup" ? (
              <Link to="/">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  Login
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Login
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
