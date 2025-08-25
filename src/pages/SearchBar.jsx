import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full sm:w-1/2 mx-auto">
      {/* Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 pl-10 pr-8 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />

      {/* Icon */}
      <IoMdSearch className="absolute left-3 top-3 text-gray-500 text-lg" />

      {/* Clear Button */}
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
