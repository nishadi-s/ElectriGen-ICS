import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2
import NavbarNishadi from '../components/SupplierOrderNavbar'
import "../SupplierOrder.css";

const EditSupplierOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    Sup_matrial_code: "",
    M_Name: "",
    Sup_Quant: "",
   
  });
  const [currentItemIndex, setCurrentItemIndex] = useState(0); 
  const [nextItemNumber, setNextItemNumber] = useState(1); // To track the next item number

  const updateItem = () => {
    if (newItem.Sup_matrial_code && newItem.M_Name && newItem.Sup_Quant) {
      const updatedItems = [...items];
      updatedItems[currentItemIndex] = newItem;
      setItems(updatedItems);

      if (currentItemIndex < items.length - 1) {
        const nextItem = items[currentItemIndex + 1];
        setNewItem({
          Sup_matrial_code: nextItem.Sup_matrial_code,
          M_Name: nextItem.M_Name,
          Sup_Quant: nextItem.Sup_Quant,
          
        });
        setCurrentItemIndex((prevIndex) => prevIndex + 1);
        setNextItemNumber((prevNumber) => prevNumber + 1); // Update next item number
      } else {
        setNewItem({
          Sup_matrial_code: "",
          M_Name: "",
          Sup_Quant: "",
          
        });
        setNextItemNumber((prevNumber) => prevNumber + 1); // Increment next item number
      }

      // Display success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: `Item ${nextItemNumber} has been successfully updated`,
        showConfirmButton: false,
        timer: 2000 // Close after 2 seconds
      });
    }
  };

  useEffect(() => {
    const fetchSupplierOrders = async () => {
      try {
        const response = await fetch(`/api/supplier_order/${id}`);
        const supplierOrderData = await response.json();

        setOrder_ID(supplierOrderData.Sup_Ord_id);
        setSupplier_ID(supplierOrderData.Sup_ID);
        setItems(supplierOrderData.items);
        setOrderedDate(new Date(supplierOrderData.Sup_orded_date));
        setReceiptDate(new Date(supplierOrderData.Sup_recpt_date));
        setOrderStatus(supplierOrderData.Sup_Ord_sts);
        setSupplierRating(supplierOrderData.Sup_rating);
        setError(null);
        setEmptyFields([supplierOrderData.emptyFields]);
        
        if (supplierOrderData.items.length > 0) {
          const firstItem = supplierOrderData.items[0];
          setNewItem({
            Sup_matrial_code: firstItem.Sup_matrial_code,
            M_Name: firstItem.M_Name,
            Sup_Quant: firstItem.Sup_Quant,
            
          });
        } else {
          setNextItemNumber(1); // If there are no items, reset next item number to 1
        }
      } catch (error) {
        console.error('Error fetching supplier orders');
      }
    };
    fetchSupplierOrders();
  }, [id]);

  const handleEditSupplierOrder = async () => {
    navigate(`/Order/`);
    const updatedSupplierOrder = {
      Sup_Ord_id,
      Sup_ID,
      items,
      Sup_orded_date,
      Sup_recpt_date,
      Sup_Ord_sts,
      Sup_rating,
    };

    try {
      const response = await fetch(`/api/supplier_order/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedSupplierOrder),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedSupplierOrderData = await response.json();
        setOrder_ID(updatedSupplierOrderData.Sup_Ord_id);
        setSupplier_ID(updatedSupplierOrderData.Sup_ID);
        setItems(updatedSupplierOrderData.items);
        setOrderedDate(new Date(updatedSupplierOrderData.Sup_orded_date));
        setReceiptDate(new Date(updatedSupplierOrderData.Sup_recpt_date));
        setOrderStatus(updatedSupplierOrderData.Sup_Ord_sts);
        setSupplierRating(updatedSupplierOrderData.Sup_rating);
      
        navigate('/Order'); 
        
        // Display success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Order has been updated successfully',
          showConfirmButton: false,
          timer: 2000 // Close after 2 seconds
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error ? errorData.error : "Error updating order");
        setEmptyFields(errorData.emptyFields ? errorData.emptyFields : []);
      }
    } catch (error) {
      console.error("Error updating supplier order:", error);
      setError("Error updating supplier order. Please try again.");
    }
  };

  return (
    <NavbarNishadi>
      <form className="update-supplier-order">
      <h3>Edit an Order</h3>

      <label>Order ID:</label>
      <input
        type="text"
        readOnly
        onChange={(e) => setOrder_ID(e.target.value)}
        value={Sup_Ord_id}
        className={emptyFields.includes("Supplier Order ID") ? "error" : ""}
      />

      <label>Supplier ID:</label>
      <input
        type="text"
        readOnly
        onChange={(e) => setSupplier_ID(e.target.value)}
        value={Sup_ID}
        className={emptyFields.includes("Supplier ID") ? "error" : ""}
      />

      <label>Item Number:</label>
      <span>{`Item ${nextItemNumber}`}</span>

      <label>Material Code:</label>
      <input
        type="text"
        readOnly
        onChange={(e) =>
          setNewItem({ ...newItem, Sup_matrial_code: e.target.value })
        }
        value={newItem.Sup_matrial_code}
        className={emptyFields.includes("Supplier Material Code") ? "error" : ""}
      />

    <label>Material Name:</label>
      <input
        type="text"
        readOnly
        onChange={(e) => setNewItem({ ...newItem, M_Name: e.target.value })}
        value={newItem.M_Name}
        className={emptyFields.includes("Supplier Material Name") ? "error" : ""}
      />


      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) =>
          setNewItem({ ...newItem, Sup_Quant: e.target.value })
        }
        value={newItem.Sup_Quant}
        className={
          emptyFields.includes("Supplier Order Quantity") ? "error" : ""
        }
      />

      
      <button type="button" onClick={updateItem}>
        Update Item {nextItemNumber} {/* Display next item number */}
      </button>

      <label>Ordered Date:</label>
      <input
        type="date"
        readOnly
        onChange={(e) => setOrderedDate(new Date(e.target.value))}
        value={Sup_orded_date.toISOString().split('T')[0]} 
        className={
          emptyFields.includes("Supplier Order Ordered Date") ? "error" : ""
        }
      />

      <label>Receipt Date:</label>
      <input
        type="date"
        readOnly
        onChange={(e) => setReceiptDate(new Date(e.target.value))}
        value={Sup_recpt_date.toISOString().split('T')[0]} 
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

      <button className='p-2 bg-sky-300 m-8' onClick={handleEditSupplierOrder}>
            Update the Order
          </button>

      {error && <div className="error">{error}</div>}
    </form>
    </NavbarNishadi>
  );
}

export default EditSupplierOrder;