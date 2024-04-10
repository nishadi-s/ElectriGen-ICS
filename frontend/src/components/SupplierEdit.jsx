import React, { useState, useEffect } from "react";
import { useSupplierContext } from "../hooks/useSupplierContext";

const SupplierEdit = ({ supplierToUpdate }) => {
  const { dispatch } = useSupplierContext();
  const [supplierData, setSupplierData] = useState({
    Sup_ID: "",
    Sup_Name: "",
    Sup_Email: "",
    Sup_Contact: "",
    Sup_Ord_id: "",
    Sup_matrial_code: "",
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (supplierToUpdate) {
      setSupplierData({
        ...supplierData,
        Sup_ID: supplierToUpdate.Sup_ID || "",
        Sup_Name: supplierToUpdate.Sup_Name || "",
        Sup_Email: supplierToUpdate.Sup_Email || "",
        Sup_Contact: supplierToUpdate.Sup_Contact || "",
        Sup_Ord_id: supplierToUpdate.Sup_Ord_id || "",
        Sup_matrial_code: supplierToUpdate.Sup_matrial_code || "",
      });
    }
  }, [supplierToUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `/api/supplier/${supplierToUpdate._id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields);
      } else {
        setError(null);
        setEmptyFields([]);
        // Dispatch an action to update the context state if needed
        // dispatch({ type: "UPDATE_SUPPLIER", payload: data });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      {/* Form fields */}
      <label>Supplier ID:</label>
      <input
        type="text"
        name="Sup_ID"
        value={supplierData.Sup_ID}
        onChange={handleInputChange}
        className={emptyFields.includes("Supplier ID") ? "error" : ""}
      />

      {/* Supplier Name */}
      <label>Supplier Name:</label>
      <input
        type="text"
        name="Sup_Name"
        value={supplierData.Sup_Name}
        onChange={handleInputChange}
        className={emptyFields.includes("Supplier Name") ? "error" : ""}
      />

      {/* Supplier Email */}
      <label>Supplier Email:</label>
      <input
        type="text"
        name="Sup_Email"
        value={supplierData.Sup_Email}
        onChange={handleInputChange}
        className={emptyFields.includes("Supplier Email") ? "error" : ""}
      />

      {/* Supplier Contact */}
      <label>Supplier Contact:</label>
      <input
        type="text"
        name="Sup_Contact"
        value={supplierData.Sup_Contact}
        onChange={handleInputChange}
        className={emptyFields.includes("Supplier Contact") ? "error" : ""}
      />

      {/* Supplier Order ID */}
      <label>Supplier Order ID:</label>
      <input
        type="text"
        name="Sup_Ord_id"
        value={supplierData.Sup_Ord_id}
        onChange={handleInputChange}
        className={emptyFields.includes("Supplier Order ID") ? "error" : ""}
      />

      {/* Supplier Order Material Code */}
      <label>Supplier Order Material Code:</label>
      <input
        type="text"
        name="Sup_matrial_code"
        value={supplierData.Sup_matrial_code}
        onChange={handleInputChange}
        className={emptyFields.includes("Supplier Order Material Code") ? "error" : ""}
      />

      <button type="submit">Update Supplier</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierEdit;
