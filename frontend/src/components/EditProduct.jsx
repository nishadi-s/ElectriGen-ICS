import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../senith.css";
import ProductionNavbar from "../components/ProductionNavbar";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables to store product data
  const [name, setName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState([{ color: "", quantity: "" }]);
  const [unitPrice, setUnitPrice] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const productData = await response.json();

        // Populate form fields with product data
        setName(productData.name);
        setItemCode(productData.itemCode);
        setCategory(productData.category);
        setColors(productData.colors);
        setUnitPrice(productData.unitPrice);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      itemCode,
      category,
      colors,
      unitPrice,
    };

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedProductData = await response.json();
      setName(updatedProductData.name);
      setItemCode(updatedProductData.itemCode);
      setCategory(updatedProductData.category);
      setColors(updatedProductData.colors);
      setUnitPrice(updatedProductData.unitPrice);

      navigate(`/products`); // Redirect to single product page
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Error updating product");
      setEmptyFields(errorData.emptyFields || []);
    }
  };

  const handleColorChange = (index, key, value) => {
    const updatedColors = [...colors];
    updatedColors[index][key] = value;
    setColors(updatedColors);
  };

  const handleAddColor = () => {
    setColors([...colors, { color: "", quantity: "" }]);
  };

  return (
    <ProductionNavbar>
      <form className="update" onSubmit={handleSubmit}>
        <label>Product name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />
        <label>Product category:</label>
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className={emptyFields.includes("category") ? "error" : ""}
        />
        <label>Product code:</label>
        <input
          type="text"
          onChange={(e) => setItemCode(e.target.value)}
          value={itemCode}
          className={emptyFields.includes("itemCode") ? "error" : ""}
        />
        <label>Unit price(in Rs.):</label>
        <input
          type="number"
          onChange={(e) => setUnitPrice(e.target.value)}
          value={unitPrice}
          className={emptyFields.includes("unitPrice") ? "error" : ""}
        />
        <label>Colors:</label>
        {colors.map((colorObject, index) => (
          <div key={index}>
            <input
              type="text"
              value={colorObject.color}
              onChange={(e) =>
                handleColorChange(index, "color", e.target.value)
              }
              placeholder="Color"
              className={emptyFields.includes(`color-${index}`) ? "error" : ""}
            />
            <input
              type="number"
              value={colorObject.quantity}
              onChange={(e) =>
                handleColorChange(index, "quantity", e.target.value)
              }
              placeholder="Quantity"
              className={
                emptyFields.includes(`quantity-${index}`) ? "error" : ""
              }
            />
          </div>
        ))}
        <button type="button" onClick={handleAddColor}>
          Add Color
        </button>

        <button>Update Product</button>
        {error && <div className="error">{error}</div>}
      </form>
    </ProductionNavbar>
  );
};

export default EditProduct;
