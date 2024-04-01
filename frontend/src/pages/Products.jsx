import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../senith.css";

//components
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
        {/*<Link to="/pages/AddProducts">
          <button>Add a new Product</button>
          </Link>*/}
      </div>
      <ProductForm />
    </div>
  );
};

export default Products;
