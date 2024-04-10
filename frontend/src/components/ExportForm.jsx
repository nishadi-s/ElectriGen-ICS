import { useState } from "react";
import '../exports.css';
import { useExportsContext } from "../hooks/useExportsContext";
import { useEffect } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert

const ExportForm = () => {
  const { dispatch } = useExportsContext();
  const [exportOrderID, setexportOrderID] = useState('');
  const [importer, setimporter] = useState('');
  const [itemID, setitemID] = useState('');
  const [quantity, setquantity] = useState('');
  const [items, setItems] = useState([]);
  const [totalCost, settotalCost] = useState('');
  const [status, setstatus] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); // Initialize emptyFields with an empty array
  const [successMessage, setSuccessMessage] = useState('');

  const exportOrderIDPattern = /^E\d{3}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exportOrderIDPattern.test(exportOrderID)) {
      setError('Export Order ID should start with "E" followed by 3 digits (e.g., E123)');
      return;
    }

    const exportt = {
      exportOrderID,
      importer,
      items,
      totalCost,
      status
    };

    const response = await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify(exportt),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setexportOrderID('');
      setimporter('');
      setItems([]);
      settotalCost('');
      setstatus('');
      setError('');
      setEmptyFields([]);
      setSuccessMessage('New export order added successfully!');
      dispatch({ type: 'CREATE_EXPORT', payload: json });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'New export order added successfully!'
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const addItem = () => {
    if (itemID && quantity) {
      setItems([...items, { itemID, quantity }]);
      setitemID('');
      setquantity('');
    }
  };

  return (
    <form className="exportCreate" onSubmit={handleSubmit}>
      <h3>Add a new Export Order</h3>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <label>Order ID: </label><br />
      <input
        type="text"
        onChange={(e) => setexportOrderID(e.target.value)}
        value={exportOrderID}
        className={emptyFields.includes('exportOrderID') ? 'error' : ''}
      /><br />

      <label>Importer: </label><br />
      <input
        type="text"
        onChange={(e) => setimporter(e.target.value)}
        value={importer}
        className={emptyFields.includes('importer') ? 'error' : ''}
      /><br />

      <label>Item ID: </label><br />
      <input
        type="text"
        onChange={(e) => setitemID(e.target.value)}
        value={itemID}
        className={emptyFields.includes('itemID') ? 'error' : ''}
      /><br />

      <label>Quantity: </label><br />
      <input
        type="number"
        onChange={(e) => setquantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes('quantity') ? 'error' : ''}
      /><br />

      <button type="button" onClick={addItem}>Add Item</button><br />

      <label>Total Cost: </label><br />
      <input
        type="number"
        onChange={(e) => settotalCost(e.target.value)}
        value={totalCost}
        className={emptyFields.includes('totalCost') ? 'error' : ''}
      /><br />

      <label>Status: </label><br />
      <input
        type="text"
        onChange={(e) => setstatus(e.target.value)}
        value={status}
        className={emptyFields.includes('status') ? 'error' : ''}
      /><br /><br />

      <button>Add Order</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExportForm;
