import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white shadow-md border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-start gap-6 items-center px-6 py-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative group flex flex-col items-center cursor-pointer"
          >
            {/* Category Image */}
            <div
              onClick={() => navigate(`/${cat.category}`)}
              className="flex flex-col items-center hover:text-blue-600 transition"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-12 h-12 object-contain mb-1 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-medium whitespace-nowrap">
                {cat.name}
              </span>
            </div>

            {/* Subcategories Dropdown */}
            {cat.subcategories && cat.subcategories.length > 0 && (
              <div className="absolute top-14 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white shadow-xl rounded-lg border z-50 w-56">
                <ul className="py-2">
                  {cat.subcategories.map((sub, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                      onClick={() =>
                        navigate(`/${sub.toLowerCase()}`)
                      }
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
