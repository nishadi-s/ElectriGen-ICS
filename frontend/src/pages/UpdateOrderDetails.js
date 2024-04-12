import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarDini1 from '../components/DisNavbar';

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

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...updatedOrder.items];
        updatedItems[index][name] = value;
        setUpdatedOrder(prevState => ({
            ...prevState,
            items: updatedItems
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
            <NavbarDini1/>
            <h2>Edit Order Details</h2>
            <form>
                <label>Distributor ID</label>
                <input 
                    type="text"
                    name="distributorId" 
                    value={updatedOrder.distributorId} 
                    onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorId: e.target.value }))} />

                <label>Distributor's Name</label>
                <input
                    type="text"
                    name="distributorName"
                    value={updatedOrder.distributorName}
                    onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorName: e.target.value }))}
                />

                <label>Order Status</label>
                <input
                    type="text"
                    name="orderStatus"
                    value={updatedOrder.orderStatus}
                    onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, orderStatus: e.target.value }))}
                />

                {updatedOrder.items.map((item, index) => (
                    <div key={index}>
                        <label>{`Item(${index + 1}) code`}</label>
                        <input
                            type="text"
                            name={`code`}
                            value={item.code}
                            onChange={(e) => handleChange(e, index)}
                        />

                        <label>{`Item(${index + 1}) Name`}</label>
                        <input
                            type="text"
                            name={`name`}
                            value={item.name}
                            onChange={(e) => handleChange(e, index)}
                        />

                        <label>{`Item(${index + 1}) Unit`}</label>
                        <input
                            type="number"
                            name={`unit`}
                            value={item.unit}
                            onChange={(e) => handleChange(e, index)}
                        />

                        <label>{`Item(${index + 1}) Quantity`}</label>
                        <input
                            type="number"
                            name={`quantity`}
                            value={item.quantity}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>
                ))}

                <label>Total amount to pay</label>
                <input
                    type="number"
                    name="totalAmount"
                    value={updatedOrder.totalAmount}
                    onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, totalAmount: e.target.value }))}
                />

                <button className="custom-button" type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default UpdateOrder;