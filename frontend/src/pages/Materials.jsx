import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../senith.css";
import ProductionNavbar from "../components/ProductionNavbar";

//components
import MaterialDetails from "../components/MaterialDetails";
import { useMaterialContext } from "../hooks/useMaterialsContext";

const Materials = () => {
  const { materials, dispatch } = useMaterialContext();

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await fetch("/api/materials");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MATERIALS", payload: json });
      }
    };

    fetchMaterials();
  }, [dispatch]);

  return (
    <ProductionNavbar>
      <div className="home">
        <div className="products">
          {materials &&
            materials.map((material) => (
              <MaterialDetails key={material._id} material={material} />
            ))}
          {/*<Link to={`/AddProducts`} className="edit-link">
          <button>Add a new Product</button>
        </Link>*/}
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Materials;
