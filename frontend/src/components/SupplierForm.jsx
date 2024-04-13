import { useState, useEffect } from "react";
import { useSupplierContext } from "../hooks/useSupplierContext";



const SupplierForm = ({ supplierToUpdate }) => { // Receive supplierToUpdate prop
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
      // If in edit mode, pre-fill the fields with existing data
      setSupplier_ID(supplierToUpdate.Sup_ID || "");
      setSupplier_name(supplierToUpdate.Sup_Name || "");
      setEmail(supplierToUpdate.Sup_Email || "");
      setContact(supplierToUpdate.Sup_Contact || "");
      setSup_Ord_id(supplierToUpdate.Sup_Ord_id || "");
      setMaterial_code(supplierToUpdate.Sup_matrial_code || "");
    }
  }, [supplierToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      method: supplierToUpdate ? "PUT" : "POST", // Use PUT method for update, POST for create
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
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

      <label>Supplier Name:</label>
      <input
        type="text"
        onChange={(e) => setSupplier_name(e.target.value)}
        value={Sup_Name}
        className={emptyFields.includes("Suppplier Name") ? "error" : ""}
      />

      <label>Supplier Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={Sup_Email}
        className={emptyFields.includes("Supplier Email") ? "error" : ""}
      />

      <label>Supplier Contact:</label>
      <input
        type="number"
        onChange={(e) => setContact(e.target.value)}
        value={Sup_Contact}
        className={emptyFields.includes("Supplier Contact") ? "error" : ""}
      />

      <label>Supplier Order ID:</label>
      <input
        type="text"
        onChange={(e) => setSup_Ord_id(e.target.value)}
        value={Sup_Ord_id}
        className={emptyFields.includes("Supplier Order ID") ? "error" : ""}
      />

      <label>Supplier Order Material Code:</label>
      <input
        type="text"
        onChange={(e) => setMaterial_code(e.target.value)}
        value={Sup_matrial_code}
        className={emptyFields.includes("Supplier Order Ordered Date") ? "error" : ""}
      />

      <button>{supplierToUpdate ? "Update Supplier" : "Add Supplier details"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierForm;
