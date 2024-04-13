import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useDisDAuthContext } from '../hooks/useDisDAuthContext.js';
import { useOrdersContext } from '../hooks/useOrdersContext.js'; // Import useOrdersContext

// OrderDetails functional component taking order as prop
const OrderDetails = ({ order }) => {
    const { dispatch } = useOrdersContext(); // Destructure dispatch function from orders context
    const { distributor } = useDisDAuthContext();

    
    // Function to handle delete button click
    const handleClick = async () => {
        if(!distributor){
            return
        }
        const result = await Swal.fire({
            title: "Do you want to delete this record?", // Confirm deletion
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) { // If user confirms deletion
            try {
                const response = await fetch('/api/orders/' + order._id, { // Send DELETE request to delete order
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${distributor.token}`
                    }
                });
                const json = await response.json(); // Parse response JSON

                if (response.ok) { // If deletion is successful
                    dispatch({ type: 'DELETE_ORDER', payload: json }); // Dispatch DELETE_ORDER action
                    Swal.fire("Deleted", "", "success"); // Show success alert
                } else {
                    throw new Error('Failed to delete order'); // Throw error if deletion fails
                }
            } catch (error) {
                console.error(error); // Log error to console
                Swal.fire("Error Occurred", "Failed to delete order. Please try again.", "error");
            }
        }
    };

    return (
        //order details
        <div className="order-details">
            <h4>Order ID: {order._id}</h4>
            <p><strong>Distributor ID: </strong>{order.distributorId}</p>
            <p><strong>Distributor Name: </strong>{order.distributorName}</p>
            <p><strong>Order Status: </strong>{order.orderStatus}</p>
            {order.items.map((item, index) => (
                <div key={index}>
                    <p><strong>Item {index + 1} Code: </strong>{item.code}</p>
                    <p><strong>Item {index + 1} Name: </strong>{item.name}</p>
                    <p><strong>Item {index + 1} Quantity: </strong>{item.unit}</p>
                    <p><strong>Item {index + 1} Quantity: </strong>{item.quantity}</p>
                </div>
            ))}
            <p><strong>Total amount to pay: </strong>{order.totalAmount}</p>
            <p>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</p>
            <button onClick={handleClick} className="btn-delete">Delete</button>
            <Link to={`/update/${order._id}`}>Edit</Link>
        </div>
    );
};

export default OrderDetails; // Export OrderDetails component