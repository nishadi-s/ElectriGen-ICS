import React, { useState, useEffect } from 'react';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import OrderDetails from './OrderDetails.jsx';

const DisLatestOrder = () => {
  const { orders } = useOrdersContext();
  const distributor = JSON.parse(localStorage.getItem('distributor'));
  const distributorLoginID = distributor ? distributor.distributorLoginID : '';

  const [latestOrder, setLatestOrder] = useState(null);

  // Filter orders based on distributorLoginID and find the latest order
  useEffect(() => {
    if (orders && orders.length > 0) {
      const distributorOrders = orders.filter(order => order.distributorId === distributorLoginID);
      if (distributorOrders.length > 0) {
        const sortedOrders = distributorOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestOrder(sortedOrders[0]);
      }
    }
  }, [orders, distributorLoginID]);

  return (
    <div>
      {latestOrder ? (
        <div className='box'>
          <h2>Latest Order Details</h2>
          <OrderDetails order={latestOrder} />
        </div>
      ) : (
        <p>No orders found for distributor ID "{distributorLoginID}".</p>
      )}
    </div>
  );
};

export default DisLatestOrder;
