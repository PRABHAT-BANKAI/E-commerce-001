import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductPage from "../pages/ProductPage";

import Forgotpassword from "../pages/Forgotpassword";

import About from "../pages/About";
import Features from "../pages/Features";
import Contact from "../pages/Contact";

import Home from "../pages/Home";

import CartPage from "../pages/CartPage";



const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/fpass" element={<Forgotpassword />} />
        <Route path="/Home" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features/>} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cartpage" element={<CartPage/>}/>

      </Routes>
    </div>
  );
};

export default AllRoute;
