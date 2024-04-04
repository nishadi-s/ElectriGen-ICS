import { useOrdersContext } from '../hooks/useOrdersContext.js';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const OrderDetails = ({ order }) => {
    const { dispatch } = useOrdersContext();

    const handleClick = async () => {
        const result = await Swal.fire({
            title: "Do you want to delete this record?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/orders/' + order._id, {
                    method: 'DELETE'
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'DELETE_ORDER', payload: json });
                    Swal.fire("Deleted", "", "success");
                } else {
                    throw new Error('Failed to delete order');
                }
            } catch (error) {
                console.error(error);
                Swal.fire("Error Occurred", "Failed to delete order. Please try again.", "error");
            }
        }
    };

    return (
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

export default OrderDetails;