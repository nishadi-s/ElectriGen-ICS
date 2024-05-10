//supplier page

import React, { useState, useEffect } from "react";
import "../SupplierOrder.css";
import { useSupplierContext } from "../hooks/useSupplierContext";
import NavbarNishadi from "../components/SupplierOrderNavbar";

// Components
import SupplierDetails from "../components/SupplierDetails";
import SupplierForm from "../components/SupplierForm";

const Suppliers = () => {
  const { suppliers, dispatch } = useSupplierContext();
  const [searchInput, setSearchInput] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track if there are no search results
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const fetchSupplier = async () => {
      const response = await fetch("/api/supplier");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SUPPLIER", payload: json });
        setLoading(false); // Data fetching complete, set loading to false
      }
    };

    fetchSupplier();
  }, [dispatch]);

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    // Filter suppliers based on the search input, supplier name, or order ID
    const results = suppliers.filter(
      (s) =>
        s.Sup_Name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        s.Sup_Ord_id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSuppliers(results);

    // Check if there are no search results
    setNoResults(results.length === 0);
  };

  return (
    <NavbarNishadi>
      <div className="supplier_order">
        <div className="form_section">
          <SupplierForm />
        </div>
        <div>
          <div className="supplier_list_section">
            <h2>Suppliers List</h2>
            {/* Search input field */}
            <input
              type="text"
              placeholder="Search by Supplier Name or ID"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            {/* Display loading message while data is being fetched */}
            {loading && <p>Loading...</p>}
            {/* Display filtered suppliers or no search results message */}
            {!loading && searchInput !== "" && noResults && (
              <p>No search results found</p>
            )}
            {/* Only render suppliers list if data is loaded and no search results */}
            {!loading &&
              (searchInput === "" || (searchInput !== "" && !noResults)) &&
              (filteredSuppliers.length > 0
                ? filteredSuppliers
                : suppliers
              ).map((supplier) => (
                <SupplierDetails
                  key={supplier.Sup_Ord_id}
                  supplier={supplier}
                />
              ))}
          </div>
        </div>
      </div>
    </NavbarNishadi>
  );
};

export default Suppliers;
