import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../senith.css";

//components
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";
import { useProductContext } from "../hooks/useProductsContext";

const Products = () => {
  const { products, dispatch } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
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
        {/*<Link to={`/AddProduct`} className="edit-link">
          <button>Add a new Product</button>
        </Link>*/}
        <ProductForm />
      </div>
    </div>
  );
};

export default Products;
