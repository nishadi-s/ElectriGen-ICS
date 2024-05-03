import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialDetails from "../components/MaterialDetails";
//import MaterialSearch from "../components/MaterialSearch";
import { useMaterialContext } from "../hooks/useMaterialsContext";
//import ProductionNavbar from "../components/ProductionNavbar";
import "../senith.css";

const Materials = () => {
  const { materials, dispatch } = useMaterialContext();
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await fetch("/api/materials");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MATERIALS", payload: json });
        setFilteredMaterials(json);
      }
    };

    fetchMaterials();
  }, [dispatch]);

  const handleSearch = (term) => {
    const filtered = materials.filter((material) => {
      const materialName = material.name.toLowerCase();
      const itemCode = material.code.toLowerCase();
      return materialName.includes(term) || itemCode.includes(term);
    });

    setFilteredMaterials(filtered);
    setSearchTerm(term);
  };

  return (
  
      <div className="home">
        <div className="production-header">
          <h1>Material Inventory</h1>
        </div>
        <div className="products">
         

          {filteredMaterials.length === 0 && (
            <p className="no-results">
              No materials could be found with the term "{searchTerm}"
            </p>
          )}

          {filteredMaterials.length > 0 && (
            <div className="material-list">
              {filteredMaterials.map((material) => (
                <MaterialDetails key={material._id} material={material} />
              ))}
            </div>
          )}


        </div>
      </div>
 
  );
};

export default Materials;
