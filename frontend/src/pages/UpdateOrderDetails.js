import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarDini1 from '../components/DisNavbar';
import { useDisDAuthContext } from '../hooks/useDisDAuthContext';
import { useOrdersContext } from '../hooks/useOrdersContext'; // Import useOrdersContext

const UpdateOrder = () => {
    const { id } = useParams(); // Get the order ID from the URL params
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
                    headers: {
                        'Authorization': `Bearer ${distributor.token}`
                    }
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
    }, [id, distributor.token]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...updatedOrder.items];
        updatedItems[index][name] = value;
        setUpdatedOrder(prevState => ({
            ...prevState,
            items: updatedItems
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/orders/${order._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${distributor.token}`
                },
                body: JSON.stringify(updatedOrder)
            });

            if (response.ok) {
                console.log('Order updated successfully');
                ordersDispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
                navigate('/OrderHistory');
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
            <h2>Edit Order Details</h2>
            <form>
        <label htmlFor="distributorId">Distributor ID</label>
        <input 
            type="text"
            id="distributorId"
            name="distributorId" 
            value={updatedOrder.distributorId} 
            onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorId: e.target.value }))} />

        <label htmlFor="distributorName">Distributor's Name</label>
        <input
            type="text"
            id="distributorName"
            name="distributorName"
            value={updatedOrder.distributorName}
            onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, distributorName: e.target.value }))}
        />

        <label htmlFor="orderStatus">Order Status</label>
        <input
            type="text"
            id="orderStatus"
            name="orderStatus"
            value={updatedOrder.orderStatus}
            onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, orderStatus: e.target.value }))}
        />

        {updatedOrder.items.map((item, index) => (
            <div key={index}>
                <label htmlFor={`itemCode${index}`}>{`Item(${index + 1}) code`}</label>
                <input
                    type="text"
                    id={`itemCode${index}`}
                    name={`code`}
                    value={item.code}
                    onChange={(e) => handleChange(e, index)}
                />

                <label htmlFor={`itemName${index}`}>{`Item(${index + 1}) Name`}</label>
                <input
                    type="text"
                    id={`itemName${index}`}
                    name={`name`}
                    value={item.name}
                    onChange={(e) => handleChange(e, index)}
                />

                <label htmlFor={`itemUnit${index}`}>{`Item(${index + 1}) Unit`}</label>
                <input
                    type="number"
                    id={`itemUnit${index}`}
                    name={`unit`}
                    value={item.unit}
                    onChange={(e) => handleChange(e, index)}
                />

                <label htmlFor={`itemQuantity${index}`}>{`Item(${index + 1}) Quantity`}</label>
                <input
                    type="number"
                    id={`itemQuantity${index}`}
                    name={`quantity`}
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index)}
                />
            </div>
        ))}

        <label htmlFor="totalAmount">Total amount to pay</label>
        <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={updatedOrder.totalAmount}
            onChange={(e) => setUpdatedOrder(prevState => ({ ...prevState, totalAmount: e.target.value }))}
        />

        <button className="custom-button" type="button" onClick={handleUpdate}>Update</button>
    </form>
        </div>
        </NavbarDini1>
    );
};

export default UpdateOrder;