import React from "react";
import { Link } from "react-router"; // ✅ use react-router-dom instead of react-router
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <p className="text-2xl font-bold text-blue-600">LOGO</p>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-gray-700 font-medium">
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
      <div className="flex items-center space-x-6">
        <FaShoppingCart className="text-xl text-gray-700 hover:text-blue-600 cursor-pointer" />
        <span className="text-gray-600">Welcome, Darshi</span>

        {/* Auth Buttons
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
              Signup
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
