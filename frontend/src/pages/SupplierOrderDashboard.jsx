import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierOrderDetails from '../components/SupplierOrderDetails'
import NavbarNishadi from '../components/SupplierOrderNavbar';
import '../SupplierOrder.css';

const SupplierOrdersWithHighRating = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/supplier_order');
      const filteredOrders = response.data.filter(order => order.Sup_rating > 3);
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <NavbarNishadi>
    <div>
      <h1>Supplier Orders with High Rating</h1>
      {orders.map(order => (
        <SupplierOrderDetails key={order._id} order={order} />
      ))}
    </div>
    </NavbarNishadi>
  );
};

export default SupplierOrdersWithHighRating;
