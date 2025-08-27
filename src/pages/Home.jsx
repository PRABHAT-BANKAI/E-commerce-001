import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import SearchBar from "./SearchBar";
import Footer from "../components/Footer";

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

  const ProductSection = ({ title, items }) => (
    <section className="mt-6 px-4 bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((p) => (
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
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Section */}
      <CategorySection />

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <Slider />
      </div>

      {/* Product Sections */}
      <ProductSection title="Deals of the Day" items={products.slice(0, 5)} />
      <ProductSection title="Top Offers" items={products.slice(5, 10)} />
      <ProductSection title="Best of Electronics" items={products.slice(10, 15)} />
      <ProductSection title="Fashion Best Sellers" items={products.slice(15, 20)} />



      <Footer />
    </div>
  );
};

export default Home;

