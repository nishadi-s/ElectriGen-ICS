import React, { useEffect, useState } from "react";
import ProductionNavbar from "../components/ProductionNavbar";

const ProductionDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [lowQuantityProducts, setLowQuantityProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [lowQuantityMaterials, setLowQuantityMaterials] = useState([]);
  const [outOfStockMaterials, setOutOfStockMaterials] = useState([]);
  const [productionRecord, setProductionRecord] = useState(null);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 12) {
        setGreeting("Good morning!");
      } else if (hour >= 12 && hour < 14) {
        setGreeting("Good afternoon!");
      } else {
        setGreeting("Good evening!");
      }
    };

    getGreeting();

    //to update greeting every minute
    const interval = setInterval(getGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const json = await response.json();

        if (response.ok) {
          const products = json;
          const lowQuantityProducts = products.filter(
            (product) => product.quantity < 100
          );
          setLowQuantityProducts(lowQuantityProducts);
          const outOfStockProducts = products.filter(
            (product) => product.quantity === 0
          );
          setOutOfStockProducts(outOfStockProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        const json = await response.json();

        if (response.ok) {
          const materials = json;
          const lowQuantityMaterials = materials.filter(
            (material) => parseInt(material.quantity, 10) < 10
          );
          setLowQuantityMaterials(lowQuantityMaterials);
          const outOfStockMaterials = materials.filter(
            (material) => parseInt(material.quantity, 10) === 0
          );
          setOutOfStockMaterials(outOfStockMaterials);
        } else {
          console.error("Failed to fetch materials");
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    const fetchAllProductionRecords = async () => {
      try {
        const response = await fetch("/api/productions");
        const json = await response.json();

        if (response.ok) {
          const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format
          const todaysProductionRecord = json.find(
            (record) => record.date === currentDate
          );
          setProductionRecord(todaysProductionRecord);
        } else {
          console.error("Failed to fetch production records");
        }
      } catch (error) {
        console.error("Error fetching production records:", error);
      }
    };

    fetchProducts();
    fetchMaterials();
    fetchAllProductionRecords();
  }, []);

  return (
    <ProductionNavbar>
      <div>
        <div className="production-header">
          <h1>Production Dashboard</h1>
        </div>
        <h2>{greeting}</h2>
        <div>
          <h3>Products out of stock: {outOfStockProducts.length}</h3>
          <h3>Products running low on stock (Less than 100):</h3>
          <ul>
            {lowQuantityProducts.map((product) => (
              <li key={product._id}>
                {product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Materials out of stock: {outOfStockMaterials.length}</h3>
          {outOfStockMaterials.map((material) => (
            <p key={material._id}>({material.name})</p>
          ))}
        </div>
        <div>
          <h3>Todays Production</h3>
          {productionRecord ? (
            <p>{productionRecord}</p>
          ) : (
            <p>No production record found for today.</p>
          )}
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default ProductionDashboard;
