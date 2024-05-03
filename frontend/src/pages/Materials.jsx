import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialDetails from "../components/MaterialDetails";
import MaterialSearch from "../components/MaterialSearch";
import { useMaterialContext } from "../hooks/useMaterialsContext";
import ProductionNavbar from "../components/ProductionNavbar";
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
    <ProductionNavbar>
      <div className="home">
        <div className="production-header">
          <h1>Material Inventory</h1>
        </div>
        <div className="products">
          <div className="products-search">
            <MaterialSearch onSearch={handleSearch} />
          </div>

          {filteredMaterials.length === 0 && (
            <p className="no-results">
              No materials could be found with the term "{searchTerm}"
            </p>
          )}

          {filteredMaterials.length > 0 && (
            <table className="transparent-table">
              <thead className="table-header">
                <tr>
                  <th scope="col">Item Code</th>
                  <th scope="col">Name</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Available Quantity</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <MaterialDetails key={material._id} material={material} />
                ))}
              </tbody>
            </table>
          )}

          <Link to="/AddMaterials" className="edit-link">
            <button className="button-5">Add a new item</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Materials;
