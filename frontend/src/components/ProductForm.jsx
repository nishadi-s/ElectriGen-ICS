import { useState } from "react";
import { useProductContext } from "../hooks/useProductsContext";
import "../senith.css";

const colorsData = [
  { name: "White", color: "#ffffff" },
  { name: "Black", color: "#000000" },
  { name: "Grey", color: "#808080" },
  { name: "Orange", color: "#ffA500" },
  { name: "Green", color: "#008000" },
  { name: "Blue", color: "#0000ff" },
];

const ProductForm = () => {
  const { dispatch } = useProductContext();
  const [name, setName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [colors, setColors] = useState([{ color: "", quantity: "" }]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleAddColor = () => {
    setColors([...colors, { color: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      itemCode,
      category,
      colors,
      unitPrice,
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
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setName("");
      setItemCode("");
      setCategory("");
      setUnitPrice("");
      setColors([{ color: "", quantity: "" }]);
      setError(null);
      setEmptyFields([]);
      console.log("New product added successfully", json);
      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setColors(updatedColors);
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
      {colors.map((color, index) => (
        <div key={index}>
          <label>Color({index + 1})</label>
          <div className="color-dropdown">
            <select
              value={color.color}
              onChange={(e) =>
                handleColorChange(index, "color", e.target.value)
              }
            >
              <option value="">Select Color</option>
              {colorsData.map((option, i) => (
                <option key={i} value={option.color}>
                  {option.name}
                </option>
              ))}
            </select>
            <div
              className="color-sample"
              style={{ backgroundColor: color.color }}
            ></div>
          </div>
          <label>Quantity({index + 1})</label>
          <input
            type="number"
            onChange={(e) =>
              handleColorChange(index, "quantity", e.target.value)
            }
            value={color.quantity}
          />
        </div>
      ))}
      <button onClick={handleAddColor}>Include Another Color</button>
      <button>Add product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
