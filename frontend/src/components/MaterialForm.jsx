import { useState, useEffect } from "react";
import { useMaterialContext } from "../hooks/useMaterialsContext";
import "../senith.css";
import Swal from "sweetalert2";

const MaterialForm = () => {
  const { dispatch, materials } = useMaterialContext();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState(" "); // Default unit
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (materials && materials.some((material) => material.code === code)) {
      setError("Material with the same item code already exists.");
    } else {
      setError(null);
    }
  }, [code, materials]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !unitPrice || !quantity) {
      setError("Please fill all the fields");
      return;
    }

    if (error) {
      return;
    }

    // Concatenate quantity and unit
    const material = {
      name,
      code,
      unitPrice,
      quantity,
    };

    const response = await fetch("/api/materials", {
      method: "POST",
      body: JSON.stringify(material),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setName("");
      setCode("");
      setUnitPrice("");
      setQuantity("");
      setError(null);
      setEmptyFields([]);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Material has been added successfully",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        window.location.href = "/materials";
      });

      dispatch({ type: "CREATE_MATERIAL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Material</h3>
      {error && <div className="error">{error}</div>}

      <label>Material name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label>Material code:</label>
      <input
        type="text"
        value={code}
        onChange={(e) => {
          const userInput = e.target.value.replace(/[^\d]/g, "");
          setCode("DM" + userInput);
        }}
        className={error ? "error" : ""}
      />
      <label>Unit price (in Rs.):</label>
      <input
        type="number"
        onChange={(e) => setUnitPrice(e.target.value)}
        value={unitPrice}
        className={emptyFields.includes("unitPrice") ? "error" : ""}
      />
      <div className="quantity-input">
        <label>Quantity:</label>
        <input
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          className={emptyFields.includes("quantity") ? "error" : ""}
        />
      </div>
      <button className="button-5">Add Material</button>
    </form>
  );
};

export default MaterialForm;
