import { useState } from "react";
import { useProductContext } from "../hooks/useProductsContext";


const ProductForm = () => {
  const { disptach } = useProductContext();
  const [name, setName] = useState("");
  const [itemCode, setitemCode] = useState("");
  const [category, setcategory] = useState("");
  const [color, setcolor] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [cost, setcost] = useState("");
  const [quantity, setquantity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      itemCode,
      category,
      color,
      unitPrice,
      cost,
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
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setName("");
      setitemCode("");
      setcategory("");
      setcolor("");
      setunitPrice("");
      setcost("");
      setquantity("");

      setError(null);
      setEmptyFields([]);

      console.log("New product added successfully", json);
      dispatchEvent({ type: "CREATE_PRODUCT", payload: json });
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
      <label>Product category:</label>
      <input
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      />
      <label>Product code:</label>
      <input
        type="text"
        onChange={(e) => setitemCode(e.target.value)}
        value={itemCode}
        className={emptyFields.includes("itemCode") ? "error" : ""}
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
      <label>Cost(in Rs.):</label>
      <input
        type="number"
        onChange={(e) => setcost(e.target.value)}
        value={cost}
        className={emptyFields.includes("cost") ? "error" : ""}
      />
      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setquantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />
      <button>Add product</button>
      {error && <div className="error">(error)</div>}
    </form>
  );
};

export default ProductForm;
