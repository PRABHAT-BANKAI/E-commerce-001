import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <p className="text-xl font-bold text-gray-800">LOGO</p>
      <div className="space-x-4">
        <Link to={"/"}>
          <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </Link>

        <Link to={"/signup"}>
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition duration-200">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
