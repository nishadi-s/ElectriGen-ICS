import { useState } from "react";
import { useSupplierOrderContext } from "../hooks/useSupplierOrderContext";

const SupplierOrderForm = () => {
  const { dispatch } = useSupplierOrderContext();
  const [Sup_Ord_id, setOrder_ID] = useState("");
  const [Sup_ID, setSupplier_ID] = useState("");
  const [items, setItems] = useState([]);
  const [Sup_orded_date, setOrderedDate] = useState(new Date());
  const [Sup_recpt_date, setReceiptDate] = useState(new Date());
  const [Sup_Ord_sts, setOrderStatus] = useState("");
  const [Sup_rating, setSupplierRating] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [newItem, setNewItem] = useState({
    Sup_Quant: "",
    Sup_Cost: "",
    Sup_matrial_code: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      Sup_Ord_id,
      Sup_ID,
      items,
      Sup_orded_date,
      Sup_recpt_date,
      Sup_Ord_sts,
      Sup_rating,
    };

    // Send each item to the database
    try {
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
        setEmptyFields(json.emptyFields);
      } else {
        setOrder_ID("");
        setSupplier_ID("");
        setItems([]);
        setOrderedDate(new Date());
        setReceiptDate(new Date());
        setOrderStatus("");
        setSupplierRating("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_ORDER", payload: json });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add order. Please try again.");
    }
  };

  const addItem = () => {
    if (newItem.Sup_Quant && newItem.Sup_Cost && newItem.Sup_matrial_code) {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem({
        Sup_matrial_code: "",
        Sup_Cost: "",
        Sup_Quant: "",
      });
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
        className={emptyFields.includes("Supplier Order ID") ? "error" : ""}
      />

      <label>Supplier ID:</label>
      <input
        type="text"
        onChange={(e) => setSupplier_ID(e.target.value)}
        value={Sup_ID}
        className={emptyFields.includes("Supplier ID") ? "error" : ""}
      />

      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) =>
          setNewItem({ ...newItem, Sup_Quant: e.target.value })
        }
        value={newItem.Sup_Quant}
        className={
          emptyFields.includes("Supplier Order items") ? "error" : ""
        }
      />

      <label>Cost:</label>
      <input
        type="number"
        onChange={(e) => setNewItem({ ...newItem, Sup_Cost: e.target.value })}
        value={newItem.Sup_Cost}
        className={emptyFields.includes("Supplier Order items") ? "error" : ""}
      />

      <label>Material Code:</label>
      <input
        type="text"
        onChange={(e) =>
          setNewItem({ ...newItem, Sup_matrial_code: e.target.value })
        }
        value={newItem.Sup_matrial_code}
        className={emptyFields.includes("Supplier Order items") ? "error" : ""}
      />
      <button type="button" onClick={addItem}>
        Add Item
      </button>

      <label>Ordered Date:</label>
      <input
        type="date"
        onChange={(e) => setOrderedDate(e.target.value)}
        value={Sup_orded_date}
        className={
          emptyFields.includes("Supplier Order Ordered Date") ? "error" : ""
        }
      />

      <label>Receipt Date:</label>
      <input
        type="date"
        onChange={(e) => setReceiptDate(e.target.value)}
        value={Sup_recpt_date}
        className={
          emptyFields.includes("Supplier Order Received Date") ? "error" : ""
        }
      />

      <label>Order Status:</label>
      <input
        type="text"
        onChange={(e) => setOrderStatus(e.target.value)}
        value={Sup_Ord_sts}
        className={emptyFields.includes("Supplier Order Status") ? "error" : ""}
      />

      <label>Supplier Rating:</label>
      <input
        type="number"
        onChange={(e) => setSupplierRating(e.target.value)}
        value={Sup_rating}
        className={
          emptyFields.includes("Supplier Order Rating") ? "error" : ""
        }
      />

      <button type="submit">Add order details</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierOrderForm;
