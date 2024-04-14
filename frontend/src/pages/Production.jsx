import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../senith.css";

//components
import ProductionDetails from "../components/ProductionDetails";
import ProductionNavbar from "../components/ProductionNavbar";

const Production = () => {
  const [production, setProduction] = useState(null);
  useEffect(() => {
    const fetchProduction = async () => {
      const response = await fetch("/api/production");
      const json = await response.json();

      if (response.ok) {
        setProduction(json);
      }
    };

    fetchProduction();
  }, []);

  return (
    <ProductionNavbar>
      <div className="home">
        <div className="production">
          {production &&
            production.map((production) => (
              <ProductionDetails key={production._id} production={production} />
            ))}
          <Link to="/AddProduction" className="edit-link">
            <button>Add a new record</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Production;
