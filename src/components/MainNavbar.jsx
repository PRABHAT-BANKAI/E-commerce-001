import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import SearchBar from "../pages/SearchBar";

const MainNavbar = ({ user, searchQuery, setSearchQuery }) => { // ✅ now props
  const [openProfile, setOpenProfile] = React.useState(false);
  const profileRef = useRef(null);

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get first letter from name
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/">ApanKart</Link>
          </div>

          {/* Search bar (desktop/tablet) */}
          <div className="hidden sm:flex flex-1 max-w-lg mx-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 relative">
            {/* Cart */}
            <Link to="/cartpage">
              <FaShoppingCart className="text-2xl cursor-pointer hover:text-blue-600" />
            </Link>

            {/* Profile with dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="focus:outline-none w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold"
              >
                {user && user.name ? (
                  getInitial(user.name)
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                  {user && user.name ? (
                    <>
                      {/* Greeting */}
                      <div className="px-4 py-2 text-gray-700 font-medium border-b">
                        Hi, {user.name}
                      </div>
                      <Link
                        to="/profile/edit"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenProfile(false)}
                      >
                        Edit Profile
                      </Link>
                      <button
                        onClick={() => {
                          setOpenProfile(false);
                          console.log("Logging out...");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenProfile(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenProfile(false)}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (below navbar) */}
        <div className="sm:hidden py-2">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;