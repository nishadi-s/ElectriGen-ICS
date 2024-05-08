import { useState, useEffect } from "react";
import { useProductContext } from "../hooks/useProductsContext";
import "../senith.css";
import Swal from "sweetalert2"; // Import SweetAlert

const ProductForm = () => {
  const { dispatch, products } = useProductContext();
  const [name, setName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (products.some((product) => product.itemCode === itemCode)) {
      setError("Product with the same item code already exists.");
    } else {
      setError(null);
    }
  }, [itemCode, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      return; // Prevent form submission if there is an error
    }

    const product = {
      name,
      itemCode,
      category,
      color,
      unitPrice,
      quantity,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
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
      setItemCode("");
      setCategory("");
      setColor("");
      setUnitPrice("");
      setQuantity("");

      setError(null);
      setEmptyFields([]);

      // Show SweetAlert popup
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product has been added successfully",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // Redirect to products page after timer runs out
        window.location.href = "/products";
      });

      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  const handleItemCodeChange = (e) => {
    const userInput = e.target.value.replace(/[^\d]/g, "").slice(0, 3); // Allow only numbers and limit to 3 digits
    setItemCode("DP" + userInput);
  };

  const handleQuantityChange = (e) => {
    const userInput = e.target.value.replace(/[^\d]/g, ""); // Allow only numbers
    setQuantity(userInput >= 0 ? userInput : ""); // Prevent negative numbers
  };

  const handleUnitPriceChange = (e) => {
    const userInput = e.target.value.replace(/[^\d.]/g, ""); // Allow only numbers and decimal point
    setUnitPrice(userInput >= 0 ? userInput : ""); // Prevent negative numbers
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new product</h3>
      {error && <div className="error">{error}</div>}

      <label>Product name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label>Product code:</label>
      <input
        type="text"
        value={itemCode}
        onChange={handleItemCodeChange}
        className={error ? "error" : ""}
      />
      <label>Product category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      />
      <label>Color:</label>
      <select
        onChange={handleColorChange}
        value={color}
        className={emptyFields.includes("color") ? "error" : ""}
        style={{
          width: "100%",
          padding: "16px 20px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#ffffff",
        }}
      >
        <option value="">Select a color</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="gray">Gray</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
        <option value="transparent">Transparent</option>
      </select>
      <label>Unit price(in Rs.):</label>
      <input
        type="number"
        onChange={handleUnitPriceChange}
        value={unitPrice}
        className={emptyFields.includes("unitPrice") ? "error" : ""}
      />
      <label>Quantity:</label>
      <input
        type="number"
        onChange={handleQuantityChange}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />
      <button className="button-5">Add product</button>
    </form>
  );
};

export default ProductForm;
