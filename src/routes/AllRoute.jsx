import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductPage from "../pages/ProductPage";
import Forgotpassword from "../pages/Forgotpassword";

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/fpass" element={<Forgotpassword />} />
      </Routes>
    </div>
  );
};

export default AllRoute;
