import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { addToCart } from "../redux/feature/cartSlice";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  // cart
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Add to Cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`🛒 Added "${product.title}" to cart`);
  };

  // Buy Now
  const handleBuyNow = (product) => {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);
    if (!alreadyInCart) {
      dispatch(addToCart(product));
    }
    navigate("/cartpage");
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter + Sort (simple JS)
  const filteredProducts = products
    .filter((p) => {
      // search
      if (searchQuery.trim() === "") return true;
      const q = searchQuery.toLowerCase();
      return (
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      );
    })
    .filter((p) => {
      // category
      if (category === "all") return true;
      return (p.category || "").toLowerCase() === category.toLowerCase();
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  // Unique Categories
  const uniqueCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50">
      {/* Filters Section */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Price Sorting */}
        <select
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* Header */}
      <header className="bg-white shadow p-6 mb-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🛍️ Explore Products
        </h1>
      </header>

      {/* Main Products */}
      <main className="max-w-7xl mx-auto">
        {loading && <p className="text-center text-gray-500">Loading products...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-600">No products found 😔</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-64 object-cover hover:opacity-90 transition"
                />
                <div className="p-5">
                  <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-900 font-extrabold text-lg">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      <FaMoneyBillWave />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
