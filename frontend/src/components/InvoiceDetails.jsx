import React, { useState } from 'react';
import { useSalesContext } from '../hooks/useSalesContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Import Link for routing


const InvoiceDetails = ({ invoice }) => {
    const { dispatch } = useSalesContext();
    const [deleted, setDeleted] = useState(false); // State variable to track deletion

    const handleClick = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#233066",
            cancelButtonColor: "#EC2026",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            // Use async to handle asynchronous deletion logic
            if (result.isConfirmed) {
                // Perform deletion logic
                const response = await fetch(`http://localhost:4000/sales/delete/${invoice.billID}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const json = await response.json();
                    dispatch({ type: "DELETE_SALES", payload: json });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                    setDeleted(true); // Update state to hide the component after deletion
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the product.",
                        icon: "error",
                    });
                }
            }
        });
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
                        Item {index + 1}: {item.desc}, Quantity: {item.qty}, Price: {item.price}, Item Amount: {item.iamount}
                    </li>
                ))}
            </ul>
            <br />
            {/* Add onClick event with the handleClick function */}
            <button className="btn btn-danger" onClick={handleClick}>Delete</button>

            {/* Link to the updating page with bill ID */}
            <Link to={`/InvoiceUpdate/${invoice.billID}`}>
                <button className="btn btn-primary">Update</button>
            </Link>
        </div>
    );
};

export default InvoiceDetails;
