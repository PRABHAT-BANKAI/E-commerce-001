import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
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

  // Helper to pick random N products
  const getRandomProducts = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const ProductSection = ({ title, items }) => (
    <section className="mt-6 px-4 bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.length > 0 ? (
          items.map((p) => (
            <div
              key={p.id}
              className="bg-gray-50 p-3 rounded-lg border hover:shadow-lg cursor-pointer"
            >
              <img
                src={p.image_url || "https://via.placeholder.com/200"}
                alt={p.title}
                className="w-full h-36 object-contain"
              />
              <h3 className="text-sm font-medium mt-2 line-clamp-1">{p.title}</h3>
              <p className="text-blue-900 font-bold">₹{p.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available</p>
        )}
      </div>
    </section>
  );

  // 🔹 Filter products category-wise & pick random 5
  const mobiles = getRandomProducts(products.filter((p) => p.category === "mobiles"), 5);
  const electronics = getRandomProducts(products.filter((p) => p.category === "electronics"), 5);
  const fashion = getRandomProducts(products.filter((p) => p.category === "fashion"), 5);  //
  const furniture = getRandomProducts(products.filter((p) => p.category === "furniture"), 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Section */}
      <CategorySection />

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <Slider />
      </div>

      {/* Product Sections - Random 5 per category */}
      <ProductSection title="Deals of the Day (Mobiles)" items={mobiles} />
      <ProductSection title="Best of Electronics" items={electronics} />
      <ProductSection title="Fashion Best Sellers" items={fashion} />
      <ProductSection title="Home Appliances" items={furniture} />

      <Footer />
    </div>
  );
};

export default Home;
