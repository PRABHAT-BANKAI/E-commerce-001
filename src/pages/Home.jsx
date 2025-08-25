import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import SearchBar from "./SearchBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter + Sort Products
  const filteredProducts = [...products]
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "lowToHigh") return a.price - b.price;
      if (sort === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Section */}
      <CategorySection />

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <Slider />
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-6 px-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Sort Dropdown */}
      <div className="max-w-7xl mx-auto px-4 mb-6 flex justify-end">
        <select
          className="border rounded-lg px-3 py-2 shadow-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transition transform hover:-translate-y-1"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-48 object-contain p-4"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {product.description}
                  </p>
                  <span className="text-gray-900 font-bold text-lg">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
