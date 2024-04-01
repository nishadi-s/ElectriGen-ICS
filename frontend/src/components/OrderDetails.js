import { useOrdersContext } from '../hooks/useOrdersContext.js'
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const OrderDetails = ({order}) => {
    const { dispatch } = useOrdersContext()

    const handleClick = async() => {
        const response = await fetch('/api/orders/' + order._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_ORDER', payload: json})
        }
    }

    return(
        <div className="order-details">
            <h4>Order ID: {order._id}</h4>
            <p><strong>Distributor ID: </strong>{order.distributorId}</p>
            <p><strong>Distributor Name: </strong>{order.distributorName}</p>
            <p><strong>Item(1) Code: </strong>{order.item1_code}</p>
            <p><strong>Item(1) Name: </strong>{order.item1_name}</p>
            <p><strong>Item(1) Quantity: </strong>{order.item1_quantity}</p>
            <p><strong>Item(2) Code: </strong>{order.item2_code}</p>
            <p><strong>Item(2) Name: </strong>{order.item2_name}</p>
            <p><strong>Item(2) Quantity: </strong>{order.item2_quantity}</p>
            <p><strong>Item(3) Code: </strong>{order.item3_code}</p>
            <p><strong>Item(3) Name: </strong>{order.item3_name}</p>
            <p><strong>Item(3) Quantity: </strong>{order.item3_quantity}</p>
            <p><strong>Order Status: </strong>{order.orderStatus}</p>
            <p>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</p>
            <span className= "material-symbols-outlined" onClick = {handleClick}>Delete</span>
            <Link to={`/update/${order._id}`}>Edit</Link> {/* Add Link for Edit button */}
        </div>
    )
}

export default OrderDetails