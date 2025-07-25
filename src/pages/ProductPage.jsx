import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = (product) => {
    alert(`🛒 Added "${product.title}" to cart`);
  };

  const handleBuyNow = (product) => {
    alert(`💰 Buying "${product.title}"`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3004/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Product Catalog
        </h1>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-64 object-cover hover:opacity-90 transition-opacity duration-300"
                />
                <div className="p-5">
                  <h2 className="font-bold text-lg text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-600 font-bold text-lg">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>

                    {/* Buy Now Button */}
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300"
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
    </div>
  );
};

export default ProductPage;
