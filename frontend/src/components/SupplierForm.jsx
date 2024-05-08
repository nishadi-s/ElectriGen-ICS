import React, { useState, useEffect } from "react";
import { useSupplierContext } from "../hooks/useSupplierContext";
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../SupplierOrder.css';

const SupplierForm = ({ supplierToUpdate }) => {
  const { dispatch } = useSupplierContext();
  const [Sup_ID, setSupplier_ID] = useState("");
  const [Sup_Name, setSupplier_name] = useState("");
  const [Sup_Email, setEmail] = useState("");
  const [Sup_Contact, setContact] = useState("");
  const [Sup_Ord_id, setSup_Ord_id] = useState("");
  const [Sup_matrial_code, setMaterial_code] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (supplierToUpdate) {
      setSupplier_ID(supplierToUpdate.Sup_ID || "");
      setSupplier_name(supplierToUpdate.Sup_Name || "");
      setEmail(supplierToUpdate.Sup_Email || "");
      setContact(supplierToUpdate.Sup_Contact || "");
      setSup_Ord_id(supplierToUpdate.Sup_Ord_id || "");
      setMaterial_code(supplierToUpdate.Sup_matrial_code || "");
    }
  }, [supplierToUpdate]);

  useEffect(() => {
    if (!supplierToUpdate) {
      // Generate supplier ID when component mounts if it's not in update mode
      const generatedSupplierID = generateID("S");
      setSupplier_ID(generatedSupplierID);
    }
  }, [supplierToUpdate]);

  useEffect(() => {
    // Generate supplier order ID when component mounts
    const generatedSupplierOrderID = generateID("SO");
    setSup_Ord_id(generatedSupplierOrderID);
  }, []);

  const generateID = (prefix) => {
    // Generate a unique ID using a prefix and timestamp
    const timestamp = Date.now(); // Current timestamp
    return prefix + timestamp; // Concatenate prefix and timestamp
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateContact = (contact) => {
    const contactPattern = /^\d+$/;
    return contactPattern.test(contact);
  };

  const validateSupplierID = (supplierID) => {
    return supplierID.startsWith("S") && supplierID.length > 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(Sup_Email);
    const isValidContact = validateContact(Sup_Contact);
    const isValidSupplierID = validateSupplierID(Sup_ID);

    if (!isValidEmail || !isValidContact || !isValidSupplierID) {
      let errorMessage = "Invalid input. Please check your fields:";
      if (!isValidEmail) errorMessage += " Email format is incorrect.";
      if (!isValidContact) errorMessage += " Contact should contain only numbers.";
      if (!isValidSupplierID) errorMessage += " Supplier ID should start with 'S'.";
      setError(errorMessage);
      return;
    }

    const supplier = {
      Sup_ID,
      Sup_Name,
      Sup_Email,
      Sup_Contact,
      Sup_Ord_id,
      Sup_matrial_code,
    };

    const apiUrl = supplierToUpdate ? `/api/supplier/${supplierToUpdate._id}` : "/api/supplier";

    const response = await fetch(apiUrl, {
      method: supplierToUpdate ? "PUT" : "POST",
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setSupplier_ID("");
      setSupplier_name("");
      setEmail("");
      setContact("");
      setSup_Ord_id("");
      setMaterial_code("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: supplierToUpdate ? "UPDATE_SUPPLIER" : "CREATE_SUPPLIER", payload: json });

      // Display success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Supplier details have been successfully added',
        showConfirmButton: false,
        timer: 2000 // Close after 2 seconds
      });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{supplierToUpdate ? "Edit Supplier" : "Add a new Supplier"}</h3>

      <label>Supplier ID:</label>
      <input
        type="text"
        value={Sup_ID}
        readOnly
      />

      <label>Supplier Name:</label>
      <input
        type="text"
        onChange={(e) => setSupplier_name(e.target.value)}
        value={Sup_Name}
        className={emptyFields.includes("Supplier Name") ? "error" : ""}
      />
      {emptyFields.includes("Supplier Name") && <div className="error">Please enter a valid Supplier Name.</div>}

      <label>Supplier Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={Sup_Email}
        className={emptyFields.includes("Supplier Email") ? "error" : ""}
      />
      {emptyFields.includes("Supplier Email") && <div className="error">Please enter a valid email address.</div>}

      <label>Supplier Contact:</label>
      <input
        type="number"
        onChange={(e) => setContact(e.target.value)}
        value={Sup_Contact}
        className={emptyFields.includes("Supplier Contact") ? "error" : ""}
      />
      {emptyFields.includes("Supplier Contact") && <div className="error">Please enter a valid contact number.</div>}

      <label>Supplier Order ID:</label>
      <input
        type="text"
        value={Sup_Ord_id}
        readOnly
      />

      <label>Supplier Order Material Code:</label>
      <input
        type="text"
        onChange={(e) => setMaterial_code(e.target.value)}
        value={Sup_matrial_code}
        className={emptyFields.includes("Supplier Order Material Code") ? "error" : ""}
      />
      {emptyFields.includes("Supplier Order Material Code") && <div className="error">Please enter a valid Supplier Order Material Code.</div>}

      <button className="Sup_button">{supplierToUpdate ? "Update Supplier" : "Add Supplier details"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierForm;
