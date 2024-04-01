import { useState } from "react";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [itemCode, setitemCode] = useState("");
  const [category, setcategory] = useState("");
  const [color, setcolor] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [cost, setcost] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      itemCode,
      category,
      color,
      unitPrice,
      cost,
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
    }

    if (response.ok) {
      setName("");
      setitemCode("");
      setcategory("");
      setcolor("");
      setunitPrice("");
      setcost("");

      setError(null);
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
      />
      <label>Product category:</label>
      <input
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        value={category}
      />
      <label>Product code:</label>
      <input
        type="text"
        onChange={(e) => setitemCode(e.target.value)}
        value={itemCode}
      />
      <label>Color:</label>
      <input
        type="text"
        onChange={(e) => setcolor(e.target.value)}
        value={color}
      />
      <label>Unit price(in Rs.):</label>
      <input
        type="number"
        onChange={(e) => setunitPrice(e.target.value)}
        value={unitPrice}
      />
      <label>Cost(in Rs.):</label>
      <input
        type="number"
        onChange={(e) => setcost(e.target.value)}
        value={cost}
      />
      <button>Add product</button>
      {error && <div className="error">(error)</div>}
    </form>
  );
};

export default ProductForm;
