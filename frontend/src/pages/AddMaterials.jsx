import React from "react";
import MaterialForm from "../components/MaterialForm";
import ProductionNavbar from "../components/ProductionNavbar";

const AddMaterials = () => {
  return (
    <ProductionNavbar>
      <div>
        <MaterialForm />
      </div>
    </ProductionNavbar>
  );
};

export default AddMaterials;
