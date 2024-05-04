import React, { useEffect, useState } from "react";
import ProductionNavbar from "../components/ProductionNavbar";

const ProductionDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [lowQuantityProducts, setLowQuantityProducts] = useState([]);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning Senith!");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good afternoon Senith!");
      } else {
        setGreeting("Good evening Senith!");
      }
    };

    getGreeting();

    // Update greeting every minute
    const interval = setInterval(getGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLowQuantityProducts = async () => {
      try {
        const response = await fetch("/api/products/lowquantity");
        const json = await response.json();

        if (response.ok) {
          setLowQuantityProducts(json);
        } else {
          console.error("Failed to fetch low quantity products");
        }
      } catch (error) {
        console.error("Error fetching low quantity products:", error);
      }
    };

    fetchLowQuantityProducts();
  }, []);

  return (
    <ProductionNavbar>
      <div>
        <div className="production-header">
          <h1>Production Dashboard</h1>
        </div>
        <h2>{greeting}</h2>
        <div>
          <h3>Products running low on stock:</h3>
          <ul>
            {lowQuantityProducts.map((product) => (
              <li key={product._id}>
                {product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default ProductionDashboard;
