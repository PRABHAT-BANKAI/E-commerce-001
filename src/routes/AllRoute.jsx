import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductPage from "../pages/ProductPage";

import Forgotpassword from "../pages/Forgotpassword";

import About from "../pages/About";
import Features from "../pages/Features";
import Contact from "../pages/Contact";


const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/fpass" element={<Forgotpassword />} />

        <Route path="/product" element={<ProductPage />} />        
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features/>} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </div>
  );
};

export default AllRoute;
