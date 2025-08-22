import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const product = useSelector((state) => state.productData.products);
  console.log(product);

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

  return (
    <div className="min-h-screen py-6 px-4" style={{ backgroundColor: "#23223b" }}>
      <header className="bg-white shadow p-6 mb-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-[#23223b]">Product Catalog</h1>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading && <p className="text-center text-gray-300">Loading products...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border-4 border-[#23223b] rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-64 object-cover hover:opacity-90 transition-opacity duration-300"
                />
                <div className="p-5">
                  <h2 className="font-bold text-lg text-[#23223b] mb-2">{product.title}</h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#23223b] font-extrabold text-lg">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 border-2 border-[#23223b] text-[#23223b] hover:bg-[#23223b] hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>

                    {/* Buy Now Button */}
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex items-center justify-center gap-2 border-2 border-[#23223b] text-[#23223b] hover:bg-[#23223b] hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300"
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
