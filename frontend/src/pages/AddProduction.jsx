import React from "react";
import ProductionForm from "../components/ProductionForm";
import ProductionNavbar from "../components/ProductionNavbar";

const AddProduction = () => {
  return (
    <ProductionNavbar>
      <div>
        <ProductionForm />
      </div>
    </ProductionNavbar>
  );
};

export default AddProduction;
