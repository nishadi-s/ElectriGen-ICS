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
  const [color, setColor] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
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
        setColor(productData.color);
        setUnitPrice(productData.unitPrice);
        setQuantity(productData.quantity);
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
      color,
      unitPrice,
      quantity,
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
      setColor(updatedProductData.color);
      setUnitPrice(updatedProductData.unitPrice);
      setQuantity(updatedProductData.quantity);

      navigate('/products'); 
    } else {
      const errorData = await response.json();
      setError("Error updating product",errorData.error);
      setEmptyFields(errorData.emptyFields || []);
    }
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
          onChange={(e) => setCategory(e.target.value)} // Use setCategory
          value={category}
          className={emptyFields.includes("category") ? "error" : ""}
        />
        <label>Product code:</label>
        <input
          type="text"
          onChange={(e) => setItemCode(e.target.value)} // Use setItemCode
          value={itemCode}
          className={emptyFields.includes("itemCode") ? "error" : ""}
        />
        <label>Color:</label>
        <input
          type="text"
          onChange={(e) => setColor(e.target.value)} // Use setColor
          value={color}
          className={emptyFields.includes("color") ? "error" : ""}
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

        <button>Update Product</button>
        {error && <div className="error">{error}</div>}
      </form>
    </ProductionNavbar>
  );
};
export default EditProduct;