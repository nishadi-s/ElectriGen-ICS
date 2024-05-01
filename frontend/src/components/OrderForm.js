import React, { useState } from "react";
import { useOrdersContext } from "../hooks/useOrdersContext";
import { useDisDAuthContext } from "../hooks/useDisDAuthContext";

const OrderForm = () => {
  const { dispatch } = useOrdersContext();
  const { distributor } = useDisDAuthContext();

  const [distributorId, setDistributorId] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [items, setItems] = useState([{ code: "", name: "", unit: "", quantity: "" }]);
  const [totalAmount, setTotalAmount] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([...items, { code: "", name: "", unit: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!distributor){
      setError('You must be logged in')
      return
    }

    try {
      const order = {
        distributorId,
        distributorName,
        orderStatus,
        items,
        totalAmount,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${distributor.token}`
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        setDistributorId("");
        setDistributorName("");
        setOrderStatus("");
        setItems([{ code: "", name: "", unit: "", quantity: "" }]);
        setTotalAmount("");

        setError(null);
        setEmptyFields([]);
        console.log("new order added", json);
        dispatch({ type: "CREATE_ORDER", payload: json });
      }
    } catch (error) {
      setError("An error occurred while submitting the order.");
      console.error("Error submitting order:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Order Placement Form</h3>

      <label>Distributor ID</label>
      <input
        type="text"
        onChange={(e) => setDistributorId(e.target.value)}
        value={distributorId}
        className={emptyFields.includes("distributorId") ? "error" : ""}
      />

      <label>Distributor's Name</label>
      <input
        type="text"
        onChange={(e) => setDistributorName(e.target.value)}
        value={distributorName}
        className={emptyFields.includes("distributorName") ? "error" : ""}
      />

      <label>Order Status</label>
      <input
        type="text"
        onChange={(e) => setOrderStatus(e.target.value)}
        value={orderStatus}
      />

      {items.map((item, index) => (
        <div key={index}>
          <label>Item({index + 1}) code</label>
          <input
            type="text"
            onChange={(e) => handleItemChange(index, "code", e.target.value)}
            value={item.code}
          />

          <label>Item({index + 1}) Name</label>
          <input
            type="text"
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
            value={item.name}
          />

          <label>Item({index + 1}) Unit Price</label>
          <input
            type="number"
            onChange={(e) => handleItemChange(index, "unit", e.target.value)}
            value={item.unit}
          />

          <label>Item({index + 1}) Quantity</label>
          <input
            type="number"
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            value={item.quantity}
          />

          <button type="button" onClick={addNewItem}>
            Add Item
          </button>
        </div>
      ))}

      <label>Total Amount to Pay</label>
      <input
        type="number"
        onChange={(e) => setTotalAmount(e.target.value)}
        value={totalAmount}
      />

      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default OrderForm;