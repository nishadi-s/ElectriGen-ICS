import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../senith.css";
import ProductionDetails from "../components/ProductionDetails";
import { useProductionContext } from "../hooks/useProductionContext";
import ProductSearch from "../components/ProductSearch"; // Import ProductSearch component
import ProductionNavbar from "../components/ProductionNavbar";

const Production = () => {
  const { production, dispatch } = useProductionContext();
  const [filteredProduction, setFilteredProduction] = useState([]);

  useEffect(() => {
    const fetchProduction = async () => {
      const response = await fetch("/api/production");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTION", payload: json });
        setFilteredProduction(json); // Initialize filteredProducts with all products
      }
    };

    fetchProduction();
  }, [dispatch]);

  const handleSearch = (term) => {
    const filtered = production.filter((production) => {
      const productionDate = production.date.toLowerCase();
      return productionDate.includes(term);
    });

    setFilteredProduction(filtered);
  };

  return (
    <ProductionNavbar>
      <div className="home">
        <ProductSearch onSearch={handleSearch} />{" "}
        {/* Render ProductSearch component */}
        <div className="products">
          {filteredProduction.map((production) => (
            <ProductionDetails key={production._id} production={production} />
          ))}
          <Link to="/AddProduction" className="edit-link">
            <button>Add a new Record</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Production;
