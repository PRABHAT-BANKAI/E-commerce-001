import React from "react";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const product = useSelector((state) => state.productData.products);
  console.log(product);
  const users = useSelector((state) => state.productData.users);
  console.log(users);
  

  return (
    <>
      <h1>product</h1>
      <h2>sub products</h2>


      
    </>
  );
};

export default ProductPage;
