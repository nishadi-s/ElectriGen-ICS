// Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../senith.css";
import ProductDetails from "../components/ProductDetails";
import { useProductContext } from "../hooks/useProductsContext";
import ProductSearch from "../components/ProductSearch"; // Import ProductSearch component

const Products = () => {
  const { products, dispatch } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
        setFilteredProducts(json); // Initialize filteredProducts with all products
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSearch = (term) => {
    const filtered = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const itemCode = product.itemCode.toLowerCase();
      return productName.includes(term) || itemCode.includes(term);
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="home">
      <ProductSearch onSearch={handleSearch} />{" "}
      {/* Render ProductSearch component */}
      <div className="products">
        {filteredProducts.map((product) => (
          <ProductDetails key={product._id} product={product} />
        ))}
        <Link to="/AddProducts" className="edit-link">
          <button>Add a new Product</button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
