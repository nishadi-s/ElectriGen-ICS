import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDisDAuthContext } from '../hooks/useDisDAuthContext';
import { useOrdersContext } from '../hooks/useOrdersContext';
import Swal from 'sweetalert2';
import '../DistributionFun.css'

const UpdateOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState({});
    const { distributor } = useDisDAuthContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dispatch: ordersDispatch } = useOrdersContext();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${id}`, {
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch order');
                }
                const data = await response.json();
                setOrder(data);
                setUpdatedOrder(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrder();

        return () => {
            setOrder(null);
            setUpdatedOrder({});
        };
    }, [id, distributor?.token]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...updatedOrder.items];
        updatedItems[index][name] = value;
        setUpdatedOrder(prevState => ({
            ...prevState,
            items: updatedItems
        }));
    };

    const addNewItem = () => {
        const newItem = { code: "", name: "", unit: "", quantity: "" };
        setUpdatedOrder(prevState => ({
            ...prevState,
            items: [...prevState.items, newItem]
        }));
    };

    const calculateTotalAmount = () => {
        if (!updatedOrder.items) return 0;

        const total = updatedOrder.items.reduce((acc, item) => acc + (item.unit * item.quantity), 0);
    return total.toFixed(2);
    };

    const handleUpdate = async () => {
      try {
          // Calculate total amount
          const updatedTotalAmount = calculateTotalAmount();
          // Update total amount in updated order
          const updatedOrderWithTotalAmount = { ...updatedOrder, totalAmount: updatedTotalAmount };
          // Update state with the new total amount
          setUpdatedOrder(updatedOrderWithTotalAmount);
  
          const response = await fetch(`/api/orders/${order._id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedOrderWithTotalAmount) // Send the updated order with total amount
          });
  
          if (response.ok) {
              console.log('Order updated successfully');
              // Dispatch the updated order to the context
              ordersDispatch({ type: 'UPDATE_ORDER', payload: updatedOrderWithTotalAmount });
              // Show SweetAlert
              Swal.fire({
                icon: 'success',
                title: 'Order Successfully Updated',
                showConfirmButton: false,
                timer: 1500
            });
            // Navigate to OrderHistory after a delay
            setTimeout(() => {
                navigate('/OrderHistory');
            }, 1500);
          } else {
              throw new Error('Failed to update order');
          }
      } catch (error) {
          console.error('Error updating order:', error);
          setError(error.message);
      }
  };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
    <div className="update-order">
    <h1>Order Modification</h1>
        <form class="update-form">
      <h3>Update Order Form</h3>

  <div class="input-group">
    <label for="distributorId">Distributor ID</label>
    <input
      type="text"
      id="distributorId"
      name="distributorId"
      class="input-field"
      value={updatedOrder.distributorId}
      onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorId: e.target.value }))}
    />
  </div>

  <div class="input-group">
    <label for="distributorName">Distributor's Name</label>
    <input
      type="text"
      id="distributorName"
      name="distributorName"
      class="input-field"
      value={updatedOrder.distributorName}
      onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorName: e.target.value }))}
    />
  </div>

  <div class="input-group">
    <label for="orderStatus">Order Status</label>
    <input
      type="text"
      id="orderStatus"
      name="orderStatus"
      class="input-field"
      value={updatedOrder.orderStatus}
      readOnly
    />
  </div>

  {/* Items List */}
  {updatedOrder.items && updatedOrder.items.map((item, index) => (
    <div key={index} class="item-container">
      <label for={`itemCode${index}`} class="item-label">Item({index + 1}) Code</label>
      <input
        type="text"
        id={`itemCode${index}`}
        name={`code`}
        class="item-field"
        value={item.code}
        onChange={(e) => handleChange(e, index)}
      />

      <label for={`itemName${index}`} class="item-label">Item({index + 1}) Name</label>
      <input
        type="text"
        id={`itemName${index}`}
        name={`name`}
        class="item-field"
        value={item.name}
        onChange={(e) => handleChange(e, index)}
      />

      <label for={`itemUnit${index}`} class="item-label">Item({index + 1}) Unit Price</label>
      <input
        type="number"
        id={`itemUnit${index}`}
        name={`unit`}
        class="item-field"
        value={item.unit}
        onChange={(e) => handleChange(e, index)}
      />

      <label for={`itemQuantity${index}`} class="item-label">Item({index + 1}) Quantity</label>
      <input
        type="number"
        id={`itemQuantity${index}`}
        name={`quantity`}
        class="item-field"
        value={item.quantity}
        onChange={(e) => handleChange(e, index)}
      />
    </div>
  ))}

  {/* Add Item Section */}
  <button type="button" class="add-item-button" onClick={addNewItem}>Add Item</button>

  {/* Total Amount Field */}
  <div class="input-group">
    <label for="totalAmount">Total Amount to Pay</label>
    <input
      type="text"
      id="totalAmount"
      name="totalAmount"
      class="input-field"
      value={calculateTotalAmount()}
      readOnly
    />
  </div>

  {/* Update Button */}
  <button type="button" class="custom-button" onClick={handleUpdate}>Update</button>
</form>
    </div>
    );
};

export default UpdateOrder;