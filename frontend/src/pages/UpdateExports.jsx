import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { findOne } from '../../../Backend/models/exportModel.js';
//import { findOne } from '../../../Backend/models/exportModel.js';

const UpdateOrder = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const [order, setOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    useEffect(() => {
        // Fetch the order details based on the ID when the component mounts
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/export/${order._id}`);
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
            const response = await fetch(`/api/export/${id}`, {
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
                //window.location.href = '/OrderHistory';
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
        <div className="update-export">
            <h2>Edit Order</h2>
            <form>
            <label>Order ID:</label>
                <input 
                    type="text"
                    name="exportOrderID" 
                    value={updatedOrder.exportOrderID} 
                    onChange={handleChange} />

            <label>Importer: </label>
                <input
                    type="text"
                    name="importer"
                    value={updatedOrder.importer}
                    onChange={handleChange}
                />

            <label>Item ID: </label>
                <input
                    type="text"
                    name="itemID"
                    value={updatedOrder.itemID}
                    onChange={handleChange}
                />

            <label>Quantity: </label>
                <input
                    type="number"
                    name="quantity"
                    value={updatedOrder.quantity}
                    onChange={handleChange}
                />

            <label>Total Cost: </label>
                <input
                    type="number"
                    name="totalCost"
                    value={updatedOrder.totalCost}
                    onChange={handleChange}
                />

                <label>Status: </label>
                <input
                    type="text"
                    name="status"
                    value={updatedOrder.status}
                    onChange={handleChange}
                />

            

                <button className="custom-button" type="submit" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default UpdateOrder;