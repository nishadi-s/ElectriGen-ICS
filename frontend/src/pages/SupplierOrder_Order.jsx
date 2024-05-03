import React, { useState } from "react";
import '../SupplierOrder.css';
import { useEffect } from 'react'
import { useSupplierOrderContext } from "../hooks/useSupplierOrderContext";
import { useNavigate } from 'react-router-dom';
import NavbarNishadi from '../components/SupplierOrderNavbar'
import SupplierOrderDetails from '../components/SupplierOrderDetails'

const SupplierOrders = () => {
  const navigate = useNavigate();
  const { orders, dispatch } = useSupplierOrderContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSupplierOrder = async () => {
      const response = await fetch('/api/supplier_order');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ORDERS', payload: json });
      }
    };

    fetchSupplierOrder();
  }, [dispatch]);

  // Filter orders based on search query
  useEffect(() => {
    if (orders) {
      const filteredOrders = orders.filter(order => {
        return order.Sup_Ord_id.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(filteredOrders);
    }
  }, [orders, searchQuery]);

  // Handle navigation to report page
  const handleGenerateReport = () => {
    navigate("/supplierOrderReport", { state: { orders: searchResults } });
  };

  return (
    <NavbarNishadi>
      <div className="supplier_order">
        <h1>Supplier Orders Details</h1>
        
        <button className='button' onClick={() => navigate('/supplierorderform')} style={{ marginRight: '900px' }}> Add a new Order</button>
        <button className='button' onClick={handleGenerateReport}> Generate the Report</button>
        
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Display search results or message if no results */}
        {searchResults.length > 0 ? (
          searchResults.map(order => (
            <SupplierOrderDetails key={order.Sup_Ord_id} order={order} />
          ))
        ) : (
          <p>No search results found</p>
        )}

        
      </div>
    </NavbarNishadi>
  );
};

export default SupplierOrders;
