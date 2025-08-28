import React from "react";
import { Route, Routes } from "react-router-dom"; // ✅ must use react-router-dom
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductPage from "../pages/ProductPage";
import Forgotpassword from "../pages/Forgotpassword";
import About from "../pages/About";
import Features from "../pages/Features";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import Mobile from "../pages/Mobile";
import Electronic from "../pages/Electronic";
import Beauty from "../pages/Beauty";
import Fashion from "../pages/Fashion";
import Furniture from "../pages/Furniture";     
import TvApplications from "../pages/TvApplications"; 

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:category" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/fpass" element={<Forgotpassword />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mobiles" element={<Mobile />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/electronics" element={<Electronic />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/furniture" element={<Furniture />} />  
        <Route path="/Tv&Applinces" element={<TvApplications />} /> 
      </Routes>
    </div>
  );
};

export default AllRoute;
