import React, { useState, useEffect } from 'react';
import NavbarDini1 from '../components/DisNavbar.jsx';
import OrderDetails from '../components/OrderDetails.jsx';
import SearchBar from '../components/Distributor_Search.jsx';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import '../DistributionFun.css';

const OrderHistory = () => {
  const { orders, dispatch } = useOrdersContext();
  const distributor = JSON.parse(localStorage.getItem('distributor'));
  const distributorLoginID = distributor ? distributor.distributorLoginID : '';

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ORDERS', payload: json });
      }
    };

    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    // Filter orders based on distributorLoginID if orders is not null
    if (orders) {
      setFilteredOrders(orders.filter(order => order.distributorId === distributorLoginID));
    }
  }, [orders, distributorLoginID]);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <NavbarDini1>
      <div className="home">
        <h1>Order History</h1>
        <p>Distributor ID: {distributorLoginID}</p>
        <SearchBar onChange={handleFilter} style={{ marginBottom: '20px' }} />
        {filteredOrders.length > 0 ? (
          filteredOrders
            .filter((order) =>
              order.distributorId.toLowerCase().includes(searchTerm)
            )
            .map((order) => (
              <OrderDetails
                key={order._id}
                order={order}
              />
            ))
        ) : (
          searchTerm && <p>No orders found for distributor ID "{searchTerm}".</p>
        )}
      </div>
    </NavbarDini1>
  );
};

export default OrderHistory;
