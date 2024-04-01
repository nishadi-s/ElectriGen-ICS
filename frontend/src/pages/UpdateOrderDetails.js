import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateOrder = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const [order, setOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    useEffect(() => {
        // Fetch the order details based on the ID when the component mounts
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${id}`);
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
            const response = await fetch(`/api/orders/${order._id}`, {
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
            <label>Distributor ID</label>
                <input 
                    type="text"
                    name="distributorId" 
                    value={updatedOrder.distributorId} 
                    onChange={handleChange} />

            <label>Distributor's Name</label>
                <input
                    type="text"
                    name="distributorName"
                    value={updatedOrder.distributorName}
                    onChange={handleChange}
                />

            <label>Item(1) code</label>
                <input
                    type="text"
                    name="item1_code"
                    value={updatedOrder.item1_code}
                    onChange={handleChange}
                />

            <label>Item(1) Name</label>
                <input
                    type="text"
                    name="item1_name"
                    value={updatedOrder.item1_name}
                    onChange={handleChange}
                />

            <label>Item(1) Quantity</label>
                <input
                    type="number"
                    name="item1_quantity"
                    value={updatedOrder.item1_quantity}
                    onChange={handleChange}
                />

                <label>Item(2) code</label>
                <input
                    type="text"
                    name="item2_code"
                    value={updatedOrder.item2_code}
                    onChange={handleChange}
                />

            <label>Item(2) Name</label>
                <input
                    type="text"
                    name="item2_name"
                    value={updatedOrder.item2_name}
                    onChange={handleChange}
                />

            <label>Item(2) Quantity</label>
                <input
                    type="number"
                    name="item2_quantity"
                    value={updatedOrder.item2_quantity}
                    onChange={handleChange}
                />

                <label>Item(3) code</label>
                <input
                    type="text"
                    name="item3_code"
                    value={updatedOrder.item3_code}
                    onChange={handleChange}
                />

            <label>Item(3) Name</label>
                <input
                    type="text"
                    name="item3_name"
                    value={updatedOrder.item3_name}
                    onChange={handleChange}
                />

            <label>Item(3) Quantity</label>
                <input
                    type="number"
                    name="item3_quantity"
                    value={updatedOrder.item3_quantity}
                    onChange={handleChange}
                />

            

            <label>Order Status</label>
                <input
                    type="text"
                    name="orderStatus"
                    value={updatedOrder.orderStatus}
                    onChange={handleChange}
                />

                <button className="custom-button" type="submit" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default UpdateOrder;