import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import image from "../assets/main.png";
import { useSelector } from "react-redux";
import SearchBar from "../pages/SearchBar";

// Helper: Get initials
const getInitials = (firstName, lastName, fullName) => {
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName[0].toUpperCase();
  if (fullName) {
    const parts = fullName.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return "";
};

// Helper: Random background color
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;

  // Hide Cart/Profile/Search on login/signup pages
  const hideCartProfileSearch = location.pathname === "/" || location.pathname === "/signup";


  useEffect(() => {
    fetch("http://localhost:3000/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setBgColor(getRandomBgColor());
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-6 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <Link to="/product" className="flex items-center">
        <img src={image} alt="logo" className="w-24 md:w-28 h-auto" />
      </Link>


      <SearchBar/>

      {/* Search Bar */}
      {!hideCartProfileSearch && (
        <div className="hidden sm:flex items-center border rounded-lg px-2 md:px-3 py-1 w-1/2 max-w-md bg-gray-50">
          <IoMdSearch className="text-gray-500 text-lg md:text-xl mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-transparent outline-none text-gray-700 text-sm md:text-base"
          />
        </div>
      )}

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center space-x-6 relative">
        {/* Cart & Profile (hide on login/signup) */}
        {!hideCartProfileSearch && user && (
          <>
            <Link to="/cartpage" className="relative text-xl">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ${bgColor}`}
              >
                {getInitials(user.firstName, user.lastName, user.name)}
              </div>

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
          </>
        )}

        {/* Auth Buttons */}
        {!user && location.pathname === "/" && (
          <Link to="/signup">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Signup
            </button>
          </Link>
        )}
        {!user && location.pathname === "/signup" && (
          <Link to="/">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
              Login
            </button>
          </Link>
        )}
      </div>


      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t md:hidden z-50">
          {!hideCartProfileSearch && (
            <div className="flex items-center border rounded-lg m-3 px-2 py-1 bg-gray-50">
              <IoMdSearch className="text-gray-500 text-lg mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className="w-full bg-transparent outline-none text-gray-700 text-sm"
              />
            </div>
          )}

          {!hideCartProfileSearch && (
            <Link
              to="/cartpage"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 relative"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaShoppingCart className="mr-2" /> Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Mobile Auth Buttons */}
          {!user && location.pathname === "/" && (
            <Link
              to="/signup"
              className="block px-4 py-2 bg-blue-600 text-white text-center hover:bg-blue-700 m-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Signup
            </Link>
          )}
          {!user && location.pathname === "/signup" && (
            <Link
              to="/"
              className="block px-4 py-2 bg-blue-600 text-white text-center hover:bg-blue-700 m-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}

          {user && !hideCartProfileSearch && (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
