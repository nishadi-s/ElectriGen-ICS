import React, { useState, useEffect } from "react";
import '../SupplierOrder.css';
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
      try {
        const response = await fetch('/api/supplier_order');
        if (!response.ok) {
          throw new Error('Failed to fetch supplier orders');
        }
        const json = await response.json();
        console.log('Fetched orders:', json); // Log fetched orders
        dispatch({ type: 'SET_ORDERS', payload: json });
      } catch (error) {
        console.error('Error fetching supplier orders:', error);
      }
    };

    fetchSupplierOrder();
  }, [dispatch]);

  useEffect(() => {
    console.log('Search query:', searchQuery); // Log search query
    if (orders) {
      const filteredOrders = orders.filter(order => {
        return order.Sup_Ord_id.toLowerCase().includes(searchQuery.toLowerCase());
      });
      console.log('Filtered orders:', filteredOrders); // Log filtered orders
      setSearchResults(filteredOrders);
    }
  }, [orders, searchQuery]);

  const handleGenerateReport = () => {
    navigate("/supplierOrderReport", { state: { orders: searchResults } });
  };

  return (
    <NavbarNishadi>
      <div className="supplier_order">
        <h1>Supplier Orders Details</h1>
        
        <button className='Sup_button' onClick={() => navigate('/supplierorderform')} style={{ marginRight: '900px' }}> Add a new Order</button>
        <button className='Sup_button' onClick={handleGenerateReport}> Generate the Report</button>
        
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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
