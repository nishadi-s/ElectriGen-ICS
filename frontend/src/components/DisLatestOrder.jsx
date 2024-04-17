import React, { useState, useEffect } from 'react';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import OrderDetails from './OrderDetails.jsx';

const LatestOrder = () => {
  const { orders } = useOrdersContext();
  const [latestOrder, setLatestOrder] = useState(null);

  // Fetch orders on component and update latestOrder
  useEffect(() => {
    if (orders && orders.length > 0) { // Add null check for orders
      const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLatestOrder(sortedOrders[0]);
    }
  }, [orders]);

  return (
    <div>
      {latestOrder ? (
        <div>
          <h2>Latest Order Details</h2>
          <OrderDetails order={latestOrder} />
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default LatestOrder;