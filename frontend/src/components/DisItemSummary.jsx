import React, { useEffect, useState } from 'react';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';

const ItemsSummary = () => {
  const { orders } = useOrdersContext();
  const [totalItems, setTotalItems] = useState(0);
  const [mostFrequentItems, setMostFrequentItems] = useState([]);

  useEffect(() => {
    if (!orders) return; // Add null check
  
    // Calculate total items
    const calculateTotalItems = () => {
      let total = 0;
      orders.forEach(order => {
        if (order.items) { // Add null check for order.items
          order.items.forEach(item => {
            total += item.quantity;
          });
        }
      });
      return total;
    };
  
    // Calculate most frequently added items
    const calculateMostFrequentItems = () => {
      const itemMap = new Map();
      orders.forEach(order => {
        if (order.items) { // Add null check for order.items
          order.items.forEach(item => {
            const { code, name } = item;
            const key = `${code}-${name}`;
            if (itemMap.has(key)) {
              itemMap.set(key, itemMap.get(key) + item.quantity);
            } else {
              itemMap.set(key, item.quantity);
            }
          });
        }
      });
      const sortedItems = [...itemMap.entries()].sort((a, b) => b[1] - a[1]);
      return sortedItems.slice(0, 5); // Get the top 5 most frequent items
    };
  
    // Update state with calculated values
    setTotalItems(calculateTotalItems());
    setMostFrequentItems(calculateMostFrequentItems());
  }, [orders]);

  return (
    <div class="summary-container">
  <h2>Items Summary</h2>
  <div class="summary-info">
    <p>Total Items Added: {totalItems}</p>
  </div>
  <h3>Most Frequently Added Items</h3>
  <ul class="item-list">
    {mostFrequentItems.map(([key, quantity]) => (
      <li key={key} class="item">{`${key} - Quantity: ${quantity}`}</li>
    ))}
  </ul>
</div>
  );
};

export default ItemsSummary;