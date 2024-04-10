/*  import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateOrder = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const [order, setOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    useEffect(() => {
        // Fetch the order details based on the ID when the component mounts
        const fetchOrder = async () => {
            try {
                const response = await fetch(/api/supplier_order/ + $(id));
                if (!response.ok) {
                    throw new Error('Failed to fetch order');
                }
                const data = await response.json();
                setOrder(data);
                setUpdatedOrder(data); // Set updatedOrder with fetched order data
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();

        // Cleanup function to clear state if component unmounts
        return () => {
            setOrder(null);
            setUpdatedOrder(null);
        };
    }, [id]); // Re-run effect when the ID changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/supplier_order/',$(order._id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedOrder)
            });

            if (response.ok) {
                // Handle successful update response
                console.log('Order updated successfully');

                // Navigate to Order Success page
                window.location.href = '/OrderHistory';
            } else {
                // Handle error response
                console.error('Failed to update order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
            // Handle error
        }
    }

    if (!order) {
        return <div>Loading...</div>; // Render loading state while fetching order
    }

    return (
        <div className="update-order">
            <h2>Edit Order</h2>
            <form>
            
            
      <label>Order ID:</label>
      <input
        type="text"
        name="Order_ID"
        value={updatedOrder.Order_ID}
        onChange={handleChange}
      />

      <label>Supplier ID:</label>
      <input
        type="text"
        name="Supplier_ID"
        value={updatedOrder.Supplier_ID}
        onChange={handleChange}
      />

      <label>Quantity:</label>
      <input
        type="number"
        name="Quantity"
        value={updatedOrder.Quantity}
        onChange={handleChange}
      />

      <label>Cost:</label>
      <input
        type="number"
        name="Cost"
        value={updatedOrder.Cost}
        onChange={handleChange}
      />

      <label>Material Code:</label>
      <input
        type="text"
        name="Material_Code"
        value={updatedOrder.Material_Code}
        onChange={handleChange}
      />

      <label>Ordered Date:</label>
      <input
        type="date"
        name="Order_Date"
        value={updatedOrder.Order_Date}
        onChange={handleChange}
      />

      <label>Receipt Date:</label>
      <input
        type="date"
        name="Receipt_Date"
        value={updatedOrder.Receipt_Date}
        onChange={handleChange}
      />

      <label>Order Status:</label>
      <input
        type="text"
        name="Status"
        value={updatedOrder.Status}
        onChange={handleChange}
      />

      <label>Supplier Rating:</label>
      <input
        type="number"
        name="Rating"
        value={updatedOrder.Rating}
        onChange={handleChange}
      />

                <button className="custom-button" type="submit" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default UpdateOrder;*/