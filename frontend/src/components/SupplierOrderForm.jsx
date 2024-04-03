import { useState } from "react";
import { useSupplierOrderContext } from "../hooks/useSupplierOrderContext";

const SupplierOrderForm = () => {
  const {dispatch} = useSupplierOrderContext()
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
  const [emptyFields, setEmptyFields] = useState ([])

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
      setEmptyFields(json.emptyFields)
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
      setEmptyFields ([])
      dispatch({type: 'CREATE_ORDER',payload: json})
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
        className= {emptyFields.includes('Supplier Order id') ? 'error': ''}
      />

      <label>Supplier ID:</label>
      <input
        type="text"
        onChange={(e) => setSupplier_ID(e.target.value)}
        value={Sup_ID}
        className= {emptyFields.includes('Suppplier ID') ? 'error': ''}
      />

      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={Sup_Quant}
        className= {emptyFields.includes('Supplier Order Quantity') ? 'error': ''}
      />

      <label>Cost:</label>
      <input
        type="number"
        onChange={(e) => setCost(e.target.value)}
        value={Sup_Cost}
        className= {emptyFields.includes('Supplier Order Cost') ? 'error': ''}
      />

      <label>Material Code:</label>
      <input
        type="text"
        onChange={(e) => setMaterial_code(e.target.value)}
        value={Sup_matrial_code}
        className= {emptyFields.includes('Supplier Order Material Code') ? 'error': ''}
      />

      <label>Ordered Date:</label>
      <input
        type="date"
        onChange={(e) => setOrderedDate(e.target.value)}
        value={Sup_orded_date}
        className= {emptyFields.includes('Supplier Order Ordered Date') ? 'error': ''}
      />

      <label>Receipt Date:</label>
      <input
        type="date"
        onChange={(e) => setReceiptDate(e.target.value)}
        value={Sup_recpt_date}
        className= {emptyFields.includes('Supplier Order Receipt Date') ? 'error': ''}
      />

      <label>Order Status:</label>
      <input
        type="text"
        onChange={(e) => setOrderStatus(e.target.value)}
        value={Sup_Ord_sts}
        className= {emptyFields.includes('Supplier Order Status') ? 'error': ''}
      />

      <label>Supplier Rating:</label>
      <input
        type="number"
        onChange={(e) => setSupplierRating(e.target.value)}
        value={Sup_rating}
        className= {emptyFields.includes('Supplier Order  Rating') ? 'error': ''}
      />

      <button>Add order details</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierOrderForm;
