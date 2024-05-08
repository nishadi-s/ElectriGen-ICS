import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../senith.css";
import ProductionNavbar from "../components/ProductionNavbar";
import Swal from "sweetalert2";

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

    // Show SweetAlert popup to confirm whether to save changes
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
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

            // Show success popup
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Product details have been updated",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              // Redirect to products page after the timer runs out
              navigate(`/products`);
            });
          } else {
            throw new Error("Failed to update product");
          }
        } catch (error) {
          console.error("Error updating product:", error);
          Swal.fire("Error!", "Failed to update product.", "error");
        }
      } else if (result.isDenied) {
        // If denied, do nothing
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <ProductionNavbar>
      <div className="production-header">
        <h1>Edit Product Details</h1>
      </div>
      <form className="create" onSubmit={handleSubmit}>
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
        <select
          type="text"
          onChange={(e) => setColor(e.target.value)} // Use setColor
          value={color}
          className={emptyFields.includes("color") ? "error" : ""}
          style={{
            width: "100%",
            height: "45px",
            padding: "0px 5px",
            margin: "5px 0px 15px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
          }}
        >
          <option value="">Select a color</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Gray">Gray</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Orange">Orange</option>
          <option value="Transparent">Transparent</option>
        </select>
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
