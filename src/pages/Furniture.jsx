import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { addToCart } from "../redux/feature/cartSlice"; 
import Footer from "../components/Footer"; 

const Furniture = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Added missing sort state
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
        const response = await axios.get("http://localhost:3000/furniture");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Apply sorting
  const filteredProducts = [...products].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      {/* Price Sorting */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-end">
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

      {/* Main Products */}
      <main className="max-w-7xl mx-auto">
        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-600">No products found 😔</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-64 object-cover hover:opacity-90 transition"
                />
                <div className="p-5 flex flex-col justify-between h-[260px]">
                  <div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {product.category || "Uncategorized"}
                    </span>
                    <h2 className="font-semibold text-lg text-gray-800 mt-2 line-clamp-1">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-900 font-extrabold text-lg">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
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
}

export default Furniture