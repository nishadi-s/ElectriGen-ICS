import { useState, useEffect } from "react";
import { useSupplierContext } from "../hooks/useSupplierContext";

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
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{supplierToUpdate ? "Edit Supplier" : "Add a new Supplier"}</h3>

      <label>Supplier ID:</label>
      <input
        type="text"
        onChange={(e) => setSupplier_ID(e.target.value)}
        value={Sup_ID}
        className={emptyFields.includes("Supplier id") ? "error" : ""}
      />
      {emptyFields.includes("Supplier id") && <div className="error">Please enter a valid Supplier ID starting with 'S'.</div>}

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
        onChange={(e) => setSup_Ord_id(e.target.value)}
        value={Sup_Ord_id}
        className={emptyFields.includes("Supplier Order ID") ? "error" : ""}
      />
      {emptyFields.includes("Supplier Order ID") && <div className="error">Please enter a valid Supplier Order ID.</div>}

      <label>Supplier Order Material Code:</label>
      <input
        type="text"
        onChange={(e) => setMaterial_code(e.target.value)}
        value={Sup_matrial_code}
        className={emptyFields.includes("Supplier Order Ordered Date") ? "error" : ""}
      />
      {emptyFields.includes("Supplier Order Ordered Date") && <div className="error">Please enter a valid Supplier Order Material Code.</div>}

      <button>{supplierToUpdate ? "Update Supplier" : "Add Supplier details"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierForm;
