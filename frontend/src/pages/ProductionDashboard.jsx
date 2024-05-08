import React, { useState, useEffect } from "react";
import ProductionNavbar from "../components/ProductionNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ProductionDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [lowQuantityProducts, setLowQuantityProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [lowQuantityMaterials, setLowQuantityMaterials] = useState([]);
  const [outOfStockMaterials, setOutOfStockMaterials] = useState([]);
  const [productionRecord, setProductionRecord] = useState(null);
  const [currentMonthRecords, setCurrentMonthRecords] = useState([]);

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

    // Update greeting every minute
    const interval = setInterval(getGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const products = await response.json();
          setLowQuantityProducts(
            products.filter((product) => product.quantity < 100)
          );
          setOutOfStockProducts(
            products.filter((product) => product.quantity === 0)
          );
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
        if (response.ok) {
          const materials = await response.json();
          setLowQuantityMaterials(
            materials.filter((material) => parseInt(material.quantity, 10) < 10)
          );
          setOutOfStockMaterials(
            materials.filter(
              (material) => parseInt(material.quantity, 10) === 0
            )
          );
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
        if (response.ok) {
          const productionRecords = await response.json();
          setProductionRecord(
            productionRecords.find(
              (record) => record.date === new Date().toISOString().slice(0, 10)
            )
          );
          const currentMonth = new Date().getMonth();
          setCurrentMonthRecords(
            productionRecords.filter(
              (record) => new Date(record.date).getMonth() === currentMonth
            )
          );
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "#233066",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "20px",
              flexBasis: "48%",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Products Running Low on Stock</h3>
            <p>(Less than 100)</p>
            <p style={{ fontSize: "40px", margin: "10px 0" }}>
              {lowQuantityProducts.length}
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {lowQuantityProducts.map((product) => (
                <li key={product._id}>
                  {product.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              backgroundColor: "#233066",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "20px",
              flexBasis: "48%",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Materials Running Low on Stock</h3>
            <p>(Less than 10)</p>
            <p style={{ fontSize: "40px", margin: "10px 0" }}>
              {lowQuantityMaterials.length}
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {lowQuantityMaterials.map((material) => (
                <li key={material._id}>
                  {material.name} - Quantity: {material.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "#233066",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "20px",
              flexBasis: "48%",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Products Out of Stock: {outOfStockProducts.length}</h3>
            {outOfStockProducts.map((product) => (
              <p key={product._id}>{product.name}</p>
            ))}
          </div>
          <div
            style={{
              backgroundColor: "#233066",
              color: "white",
              textAlign: "center",
              padding: "10px",
              marginBottom: "20px",
              flexBasis: "48%",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Materials Out of Stock: {outOfStockMaterials.length}</h3>
            {outOfStockMaterials.map((material) => (
              <p key={material._id}>{material.name}</p>
            ))}
          </div>
        </div>
        <div>
          <h3>Today's Production</h3>
          {productionRecord ? (
            <p>{productionRecord}</p>
          ) : (
            <p>No production record found for today.</p>
          )}
        </div>
        <div>
          <h3>This Month's Production</h3>
          <BarChart width={600} height={300} data={currentMonthRecords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default ProductionDashboard;
