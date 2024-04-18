import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarDini1 from '../components/DisNavbar';
import { useOrdersContext } from '../hooks/useOrdersContext';
import '../DistributionFun.css';

const DisMUpdateOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dispatch: ordersDispatch } = useOrdersContext();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/manager/orders/${id}`);
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
    }, [id]);

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
        const newItem = { code: '', name: '', unit: '', quantity: '' };
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
            const response = await fetch(`/api/manager/orders/${order._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrder)
            });

            if (response.ok) {
                console.log('Order updated successfully');
                // Calculate total amount
                const updatedTotalAmount = calculateTotalAmount();
                // Update total amount in updated order
                const updatedOrderWithTotalAmount = { ...updatedOrder, totalAmount: updatedTotalAmount };
                // Update state with the new total amount
                setUpdatedOrder(updatedOrderWithTotalAmount);
                // Dispatch the updated order to the context
                ordersDispatch({ type: 'UPDATE_ORDER', payload: updatedOrderWithTotalAmount });
                // Navigate to OrderHistory
                navigate('/manager/orders');
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
        <NavbarDini1>
            <div className="update-order">
                <h1>Order Modification</h1>
                <form className="update-form">
                    <h3>Update Order Form</h3>

                    <div className="input-group">
                        <label htmlFor="distributorId">Distributor ID</label>
                        <input
                            type="text"
                            id="distributorId"
                            name="distributorId"
                            className="input-field"
                            value={updatedOrder.distributorId}
                            onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorId: e.target.value }))}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="distributorName">Distributor's Name</label>
                        <input
                            type="text"
                            id="distributorName"
                            name="distributorName"
                            className="input-field"
                            value={updatedOrder.distributorName}
                            onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorName: e.target.value }))}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="orderStatus">Order Status</label>
                        <input
                            type="text"
                            id="orderStatus"
                            name="orderStatus"
                            className="input-field"
                            value={updatedOrder.orderStatus}
                            readOnly
                        />
                    </div>

                    {/* Items List */}
                    {updatedOrder.items && updatedOrder.items.map((item, index) => (
                        <div key={index} className="item-container">
                            <label htmlFor={`itemCode${index}`} className="item-label">Item({index + 1}) Code</label>
                            <input
                                type="text"
                                id={`itemCode${index}`}
                                name="code"
                                className="item-field"
                                value={item.code}
                                onChange={(e) => handleChange(e, index)}
                            />

                            <label htmlFor={`itemName${index}`} className="item-label">Item({index + 1}) Name</label>
                            <input
                                type="text"
                                id={`itemName${index}`}
                                name="name"
                                className="item-field"
                                value={item.name}
                                onChange={(e) => handleChange(e, index)}
                            />

                            <label htmlFor={`itemUnit${index}`} className="item-label">Item({index + 1}) Unit Price</label>
                            <input
                                type="number"
                                id={`itemUnit${index}`}
                                name="unit"
                                className="item-field"
                                value={item.unit}
                                onChange={(e) => handleChange(e, index)}
                            />

                            <label htmlFor={`itemQuantity${index}`} className="item-label">Item({index + 1}) Quantity</label>
                            <input
                                type="number"
                                id={`itemQuantity${index}`}
                                name="quantity"
                                className="item-field"
                                value={item.quantity}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    ))}

                    {/* Add Item Section */}
                    <button type="button" className="add-item-button" onClick={addNewItem}>Add Item</button>

                    {/* Total Amount Field */}
                    <div className="input-group">
                        <label htmlFor="totalAmount">Total Amount to Pay</label>
                        <input
                            type="text"
                            id="totalAmount"
                            name="totalAmount"
                            className="input-field"
                            value={calculateTotalAmount()}
                            readOnly
                        />
                    </div>

                    {/* Update Button */}
                    <button type="button" className="custom-button" onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </NavbarDini1>
    );
};

export default DisMUpdateOrder;