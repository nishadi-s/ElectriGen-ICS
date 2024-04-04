import React, { useState, useEffect } from "react";
import InvoiceDetails from '../components/InvoiceDetails'

const ViewInvoice = () => {
    const [invoices, setInvoices] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch('http://localhost:4000/sales/display');
                if (!response.ok) {
                    throw new Error('Failed to fetch invoices');
                }
                const data = await response.json();
                setInvoices(data);
            } catch (error) {
                console.error(error);
                // Handle error, show error message, etc.
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div>
            <h1>View Invoices</h1>
            <div className="#">
                {invoices && invoices.map((invoice) => (
                    <InvoiceDetails key={invoice._id} invoice={invoice}/>
                ))}
            </div>
        </div>
    );
};

export default ViewInvoice;
