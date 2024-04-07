import React, { useState, useEffect } from 'react';
import InvoiceDetails from '../components/InvoiceDetails';
import SearchBar from '../components/SearchBar';

const ViewInvoice = () => {
  const [invoices, setInvoices] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter invoices based on search query
  const filteredInvoices = invoices
    ? invoices.filter((invoice) => invoice.billID.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div>
      <h1>View Invoices</h1>
      <div>
        <SearchBar onChange={setSearchQuery} /> {/* Pass setSearchQuery as prop */}
      </div>
      <div>
        {filteredInvoices.map((invoice) => (
          <InvoiceDetails key={invoice._id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
};

export default ViewInvoice;
