import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../senith.css";
import ProductionDetails from "../components/ProductionDetails";
import { useProductionContext } from "../hooks/useProductionContext";
import ProductionNavbar from "../components/ProductionNavbar";

const Production = () => {
  const { production, dispatch } = useProductionContext();

  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const response = await fetch("/api/production");
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_PRODUCTION", payload: json });
        } else {
          console.error("Failed to fetch production data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    };

    fetchProduction();
  }, [dispatch]);

  return (
    <ProductionNavbar>
      <div className="home">
        <div className="products">
          {production &&
            production.map((prod) => (
              <ProductionDetails key={prod._id} production={prod} />
            ))}
          <Link to="/AddProduction" className="edit-link">
            <button className="button-5">Add a new Record</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Production;
