import React, { useState, useEffect } from "react";
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

    const emptyFieldNames = [];

    // Check for empty fields
    if (!name) emptyFieldNames.push("name");
    if (!code) emptyFieldNames.push("code");
    if (!unitPrice) emptyFieldNames.push("unitPrice");
    if (!quantity) emptyFieldNames.push("quantity");

    if (emptyFieldNames.length > 0) {
      // Set empty fields to flicker
      emptyFieldNames.forEach((fieldName) => {
        const inputField = document.getElementById(fieldName);
        inputField.classList.add("error-field");
        setTimeout(() => {
          inputField.classList.remove("error-field");
        }, 100);
      });
      return;
    }

    if (error) {
      return; // Prevent form submission if there is an error
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
        id="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label>Material code:</label>
      <input
        id="code"
        type="text"
        value={code}
        onChange={(e) => {
          const userInput = e.target.value.replace(/[^\d]/g, "").slice(0, 3);
          setCode("DM" + userInput);
        }}
        className={error ? "error" : ""}
      />

      <label>Unit price (in Rs.):</label>
      <input
        id="unitPrice"
        type="number"
        onChange={(e) => setUnitPrice(e.target.value)}
        value={unitPrice}
        className={emptyFields.includes("unitPrice") ? "error" : ""}
      />
      <div className="quantity-input">
        <label>Quantity:</label>
        <input
          id="quantity"
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
