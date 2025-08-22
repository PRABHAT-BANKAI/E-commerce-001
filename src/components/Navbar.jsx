import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

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

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [bgColor, setBgColor] = useState("bg-gray-500 text-white");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  // cartsection 
 const cartItems = useSelector((state) => state.cart.cartItems);
const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);




  useEffect(() => {
    // Fetch from db.json (example: http://localhost:3000/users/1)
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

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <Link to="/product" className="text-2xl font-bold text-blue-600">
        ApanaCart
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/product" className="hover:text-blue-600 transition">
          Product
        </Link>
        <Link to="/about" className="hover:text-blue-600 transition">
          About
        </Link>
        <Link to="/features" className="hover:text-blue-600 transition">
          Features
        </Link>
        <Link to="/contact" className="hover:text-blue-600 transition">
          Contact
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6 relative"> 
        <Link to="/cart" className="relative"> 
         <FaShoppingCart/>
         {cartCount > 0 && ( 
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"> {cartCount} </span> 
          )}
          </Link>

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
              // Default show login if user is not logged in
              <Link to="">
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
