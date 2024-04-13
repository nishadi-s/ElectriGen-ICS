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
        Sup_ID: supplierToUpdate.Sup_ID || "",
        Sup_Name: supplierToUpdate.Sup_Name || "",
        Sup_Email: supplierToUpdate.Sup_Email || "",
        Sup_Contact: supplierToUpdate.Sup_Contact || "",
        Sup_Ord_id: supplierToUpdate.Sup_Ord_id || "",
        Sup_matrial_code: supplierToUpdate.Sup_matrial_code || "",
      });
    }
  }, [supplierToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if supplierToUpdate is defined and has _id property
    if (!supplierToUpdate || !supplierToUpdate._id) {
      setError("Supplier data is missing");
      return;
    }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      {/* Input fields for Supplier ID, Name, Email, Contact, etc. */}
      <input
        type="text"
        name="Sup_ID"
        value={supplierData.Sup_ID}
        onChange={handleChange}
        placeholder="Supplier ID"
      />
      <input
        type="text"
        name="Sup_Name"
        value={supplierData.Sup_Name}
        onChange={handleChange}
        placeholder="Supplier Name"
      />
      <input
        type="email"
        name="Sup_Email"
        value={supplierData.Sup_Email}
        onChange={handleChange}
        placeholder="Supplier Email"
      />
      <input
        type="text"
        name="Sup_Contact"
        value={supplierData.Sup_Contact}
        onChange={handleChange}
        placeholder="Supplier Contact"
      />
      <input
        type="text"
        name="Sup_Ord_id"
        value={supplierData.Sup_Ord_id}
        onChange={handleChange}
        placeholder="Supplier Order ID"
      />
      <input
        type="text"
        name="Sup_matrial_code"
        value={supplierData.Sup_matrial_code}
        onChange={handleChange}
        placeholder="Supplier Order Material Code"
      />
      {/* Add more input fields for other supplier data */}
      
      <button>Update Supplier</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierEdit;
