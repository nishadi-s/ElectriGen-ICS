import React from "react";
import ProductForm from "../components/ProductForm";
import ProductionNavbar from "../components/ProductionNavbar";

const AddProducts = () => {
  return (
    <ProductionNavbar>
      <div>
        <h2>Add Product</h2>
        <ProductForm />
      </div>
    </ProductionNavbar>
  );
};

export default AddProducts;
