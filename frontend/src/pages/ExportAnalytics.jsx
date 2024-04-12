import React, { useState, useEffect } from 'react';
import ExportsNavBar from "../components/ExportsNavBar.jsx";

const ExportsAnalytics = () => {
  const [mostSoldProduct, setMostSoldProduct] = useState(null);

  useEffect(() => {
    const fetchMostSoldProduct = async () => {
      try {
        const response = await fetch('/api/exports');
        if (!response.ok) {
          throw new Error('Failed to fetch most sold product');
        }
        const data = await response.json();
        setMostSoldProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMostSoldProduct();
  }, []);

  return (
    <ExportsNavBar>
    <div>
      <h1>Most Sold Product</h1>
      {mostSoldProduct && (
        <div>
          <h2>Product ID: {mostSoldProduct[0]._id}</h2>
          <p>Total Quantity Sold: {mostSoldProduct[0].totalQuantity}</p>
        </div>
      )}
    </div>
    </ExportsNavBar>
  );
};

export default ExportsAnalytics;
