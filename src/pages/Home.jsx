import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProducts } from "../redux/feature/homeSlice";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔹 Local getRandomProducts function
  const getRandomProducts = (arr, count) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 🔹 Memoized category products
  const mobiles = useMemo(() =>
    getRandomProducts(products.filter((p) => p.category === "mobiles"), 5), [products]);

  const electronics = useMemo(() =>
    getRandomProducts(products.filter((p) => p.category === "electronics"), 5), [products]);

  const fashion = useMemo(() =>
    getRandomProducts(products.filter((p) => p.category === "fashion"), 5), [products]);

  const furniture = useMemo(() =>
    getRandomProducts(products.filter((p) => p.category === "furniture"), 5), [products]);

  // 🔹 Product section component
  const ProductSection = ({ title, items }) => (
    <section className="mt-20 px-4 bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.length > 0 ? (
          items.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
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

  return (
    <div className="min-h-screen bg-gray-50">
      <CategorySection />

      <div className="max-w-7xl mt-[100px] mx-auto px-4">
        <Slider />
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ProductSection title="Deals of the Day (Mobiles)" items={mobiles} />
      <ProductSection title="Best of Electronics" items={electronics} />
      <ProductSection title="Fashion Best Sellers" items={fashion} />
      <ProductSection title="Home Appliances" items={furniture} />

      <Footer />
    </div>
  );
};

export default Home;
