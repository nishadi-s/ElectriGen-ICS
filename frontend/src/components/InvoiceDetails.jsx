import React, { useState } from 'react';
import { useSalesContext } from '../hook/useSalesContext';

const InvoiceDetails = ({ invoice }) => {
    const { dispatch } = useSalesContext();
    const [deleted, setDeleted] = useState(false); // State variable to track deletion

    const handleClick = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this invoice? This action cannot be undone.');

        if (confirmed) {
            const response = await fetch('http://localhost:4000/sales/delete/' + invoice.billID, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_SALES', payload: data });
                setDeleted(true); // Set the state to trigger re-render
            }
        }
    };

    // Check if the invoice is deleted and return null to hide the component
    if (deleted) {
        return null;
    }

    return (
        <div className="invoiceDetails">
            <h4>Bill ID: {invoice.billID}</h4>
            <h5>Total Amount: {invoice.tot}</h5>
            <h5>Total Quantity: {invoice.totqty}</h5>
            <p>Date: {new Date(invoice.bdate).toLocaleDateString()}</p>

            <ul>
                {invoice.items.map((item, index) => (
                    <li key={index}>
                        Item {index + 1}: {item.desc}, Quantity: {item.qty}, Price: {item.price}
                    </li>
                ))}
            </ul>
            <br />
            {/* Add onClick event with the handleClick function */}
            <span onClick={handleClick}><button>Delete</button></span>
        </div>
    );
};

export default InvoiceDetails;
