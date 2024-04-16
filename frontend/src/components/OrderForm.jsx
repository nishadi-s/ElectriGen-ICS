import React, { useState, useEffect,  } from "react";
import { useNavigate } from 'react-router-dom'
import { useOrdersContext } from "../hooks/useOrdersContext";
// import { useDisDAuthContext } from "../hooks/useDisDAuthContext";
import api from "../api/api";

const OrderForm = () => {
  //
  const { dispatch } = useOrdersContext();
  // const { distributor } = useDisDAuthContext();
  const navigate = useNavigate();

  const [distributorId, setDistributorId] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [orderStatus, setOrderStatus] = useState("Placed");
  const [items, setItems] = useState([{ code: "", name: "", unit: "", quantity: "" }]);
  const [totalAmount, setTotalAmount] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  // Function to calculate the total amount based on item unit price and quantity
  const calculateTotalAmount = () => {
    const total = items.reduce((acc, item) => acc + (item.unit * item.quantity), 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [items]); // Recalculate total amount whenever items change

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

    

    // if(!distributor){
    //   setError('You must be logged in')
    //   return
    // }

    // Check if any field is empty
    if (!distributorId || !distributorName || !totalAmount || items.some(item => !item.code || !item.name || !item.unit || !item.quantity)) {
      setError('Please fill in all fields');
      return;
    }

    // Check if item code starts with "IT"
    if (items.some(item => !item.code.startsWith("IT"))) {
      setError('Item code should start with "IT"');
      return;
    }

    try {
      const order = {
        distributorId,
        distributorName,
        orderStatus,
        items,
        totalAmount,
      };

      // OLD CODE
      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   body: JSON.stringify(order),
      //   headers: {
      //     "Content-Type": "application/json",
      //     'Authorization': `Bearer ${distributor.token}`
      //   },
      // });
      
      // NEW CODE
      const response = await api.post("/api/orders", order);
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        setDistributorId("");
        setDistributorName("");
        setOrderStatus("Placed");
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

    navigate('/OrderHistory');
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
    value={orderStatus}
    readOnly
  />

  {/* Item Container */}
  <div className="item-container">
    {items.map((item, index) => (
      <div key={index} className="item-fields">
        <label className="item-lable">Item({index + 1}) code</label>
        <input
          type="text"
          onChange={(e) => handleItemChange(index, "code", e.target.value)}
          value={item.code}
        />

        <label className="item-lable">Item({index + 1}) Name</label>
        <input
          type="text"
          onChange={(e) => handleItemChange(index, "name", e.target.value)}
          value={item.name}
        />

        <label className="item-lable">Item({index + 1}) Unit Price</label>
        <input
          type="number"
          onChange={(e) => handleItemChange(index, "unit", e.target.value)}
          value={item.unit}
        />

        <label className="item-lable">Item({index + 1}) Quantity</label>
        <input
          type="number"
          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
          value={item.quantity}
        />

        <label className="item-lable">Item({index + 1}) Total Price</label>
        <input
          type="text"
          value={item.unit * item.quantity}
          readOnly
        />
      </div>
    ))}
  </div>

  {/* Add Item Button */}
  <button type="button" onClick={addNewItem}>Add Item</button>

  <label>Total Amount to Pay</label>
  <input
    type="number"
    value={totalAmount}
    readOnly
  />

  <button type="submit">Submit</button>
  {error && <div className="error">{error}</div>}
</form>
  );
};

export default OrderForm;