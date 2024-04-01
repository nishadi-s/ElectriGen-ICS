import React, { useState } from "react";

const SupplierOrderForm = () => {
  const [Sup_Ord_id, setOrder_ID] = useState("");
  const [Sup_ID, setSupplier_ID] = useState("");
  const [ Sup_Quant, setQuantity] = useState("");
  const [Sup_Cost, setCost] = useState("");
  const [ Sup_matrial_code, setMaterial_code] = useState("");
  const [Sup_orded_date, setOrderedDate] = useState(new Date());
  const [Sup_recpt_date, setReceiptDate] = useState(new Date());
  const [Sup_Ord_sts, setOrderStatus] = useState("");
  const [Sup_rating, setSupplierRating] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const order = {
      Sup_Ord_id,
      Sup_ID,
      Sup_Quant,
      Sup_Cost,
      Sup_matrial_code,
      Sup_orded_date,
      Sup_recpt_date,
      Sup_Ord_sts,
      Sup_rating,
    };

    const response = await fetch("/api/supplier_order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setOrder_ID("");
      setSupplier_ID("");
      setQuantity("");
      setCost("");
      setMaterial_code("");
      setOrderedDate("");
      setReceiptDate("");
      setOrderStatus("");
      setSupplierRating("");
      setError(null);
      console.log("new supplier order added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Order</h3>

      <label>Order ID:</label>
      <input
        type="text"
        onChange={(e) => setOrder_ID(e.target.value)}
        value={Sup_Ord_id}
      />

      <label>Supplier ID:</label>
      <input
        type="text"
        onChange={(e) => setSupplier_ID(e.target.value)}
        value={Sup_ID}
      />

      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={Sup_Quant}
      />

      <label>Cost:</label>
      <input
        type="number"
        onChange={(e) => setCost(e.target.value)}
        value={Sup_Cost}
      />

      <label>Material Code:</label>
      <input
        type="text"
        onChange={(e) => setMaterial_code(e.target.value)}
        value={Sup_matrial_code}
      />

      <label>Ordered Date:</label>
      <input
        type="date"
        onChange={(e) => setOrderedDate(e.target.value)}
        value={Sup_orded_date}
      />

      <label>Receipt Date:</label>
      <input
        type="date"
        onChange={(e) => setReceiptDate(e.target.value)}
        value={Sup_recpt_date}
      />

      <label>Order Status:</label>
      <input
        type="text"
        onChange={(e) => setOrderStatus(e.target.value)}
        value={Sup_Ord_sts}
      />

      <label>Supplier Rating:</label>
      <input
        type="number"
        onChange={(e) => setSupplierRating(e.target.value)}
        value={Sup_rating}
      />

      <button>Add order details</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierOrderForm;
