import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../senith.css";
import ProductionNavbar from "../components/ProductionNavbar";

const EditMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables to store product data
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Fetch material data based on ID
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`/api/materials/${id}`);
        const materialData = await response.json();

        // Populate form fields with material data
        setName(materialData.name);
        setCode(materialData.code);
        setUnitPrice(materialData.unitPrice);
        setQuantity(materialData.quantity);
      } catch (error) {
        console.error("Error fetching material data:", error);
      }
    };

    fetchMaterial();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMaterial = {
      name,
      code,
      unitPrice,
      quantity,
    };

    const response = await fetch(`/api/materials/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedMaterial),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedMaterialData = await response.json();
      setName(updatedMaterialData.name);
      setCode(updatedMaterialData.code);
      setUnitPrice(updatedMaterialData.unitPrice);
      setQuantity(updatedMaterialData.quantity);

      navigate(`/materials`);
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Error updating material");
      setEmptyFields(errorData.emptyFields || []);
    }
  };

  return (
    <ProductionNavbar>
      <form className="update" onSubmit={handleSubmit}>
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
          onChange={(e) => setCode(e.target.value)} // Use setItemCode
          value={code}
          className={emptyFields.includes("code") ? "error" : ""}
        />
        <label>Unit price(in Rs.):</label>
        <input
          type="number"
          onChange={(e) => setUnitPrice(e.target.value)} // Use setUnitPrice
          value={unitPrice}
          className={emptyFields.includes("unitPrice") ? "error" : ""}
        />
        <label>Quantity:</label>
        <input
          type="number"
          onChange={(e) => setQuantity(e.target.value)} // Use setQuantity
          value={quantity}
          className={emptyFields.includes("quantity") ? "error" : ""}
        />

        <button>Update Material</button>
        {error && <div className="error">{error}</div>}
      </form>
    </ProductionNavbar>
  );
};

export default EditMaterial;
