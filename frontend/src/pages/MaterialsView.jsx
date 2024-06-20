import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useMaterialContext } from "../hooks/useMaterialsContext";
import NavbarNishadi from "../components/SupplierOrderNavbar";
import MaterialSearch from "../components/MaterialSearch";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "../senith.css";

const MaterialsView = () => {
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
    <NavbarNishadi>
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
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material._id} className="product-row">
                    <td style={{ fontWeight: "bold" }} className="product-code">
                      {material.code}
                    </td>
                    <td className="product-name">{material.name}</td>
                    <td className="product-unit-price">
                      Rs. {material.unitPrice}
                    </td>
                    <td
                      className={material.quantity < 100 ? "low-quantity" : ""}
                    >
                      {material.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </NavbarNishadi>
  );
};

export default MaterialsView;
