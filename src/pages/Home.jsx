import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/feature/productSlice";
import { getRandomProducts } from "../redux/feature/homeSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { products, loading, error } = useSelector((state) => state.home)

  // Fetch Products
  useEffect(() => {
     dispatch(fetchProducts())
  }, [dispatch]);

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

      {/* {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>} */}

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