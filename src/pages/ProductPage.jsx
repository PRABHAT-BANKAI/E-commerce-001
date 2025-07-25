import React from "react";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const product = useSelector((state) => state.productData.products);
  console.log(product);

  return (
    <>
      <h1>product</h1>
      <h2>sub products</h2>


      
    </>
  );
};

export default ProductPage;
