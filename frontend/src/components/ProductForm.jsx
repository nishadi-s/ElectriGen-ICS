import { useState, useEffect } from "react";
import { useProductContext } from "../hooks/useProductsContext";
import "../senith.css";
import Swal from "sweetalert2"; // Import SweetAlert

const ProductForm = () => {
  const { dispatch, products } = useProductContext();
  const [name, setName] = useState("");
  const [itemCode, setitemCode] = useState("");
  const [category, setcategory] = useState("");
  const [color, setcolor] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [quantity, setquantity] = useState("");
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
      setitemCode("");
      setcategory("");
      setcolor("");
      setunitPrice("");
      setquantity("");

      setError(null);
      setEmptyFields([]);

      // Show SweetAlert popup
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product hass been added successfully",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // Redirect to products page after timer runs out
        window.location.href = "/products";
      });

      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new product</h3>
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
        onChange={(e) => {
          const userInput = e.target.value.replace(/[^\d]/g, "");
          setitemCode("DP" + userInput);
        }}
        className={error ? "error" : ""}
      />
      <label>Product category:</label>
      <input
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      />
      <label>Color:</label>
      <input
        type="text"
        onChange={(e) => setcolor(e.target.value)}
        value={color}
        className={emptyFields.includes("color") ? "error" : ""}
      />
      <label>Unit price(in Rs.):</label>
      <input
        type="number"
        onChange={(e) => setunitPrice(e.target.value)}
        value={unitPrice}
        className={emptyFields.includes("unitPrice") ? "error" : ""}
      />
      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setquantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />
      <button className="button-5">Add product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
