import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ProductSearch from "../components/ProductSearch";
import { useProductContext } from "../hooks/useProductsContext";
import ProductionNavbar from "../components/ProductionNavbar";
import "../senith.css";

const Products = () => {
  const { products, dispatch } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
        setFilteredProducts(json);
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
    setSearchTerm(term);
  };

  return (
    <ProductionNavbar>
      <div className="home">
        <div className="production-header">
          <h1>Product Inventory</h1>
        </div>
        <div className="products">
          <div className="products-search">
            <ProductSearch onSearch={handleSearch} />
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-results">
              No products could be found with the term "{searchTerm}"
            </p>
          )}

          {filteredProducts.length > 0 && (
            <table className="transparent-table">
              <thead className="table-header">
                <tr>
                  <th scope="col">Product Code</th>
                  <th scope="col">Name</th>
                  <th scope="col">Color</th>
                  <th scope="col">Category</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Available Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <ProductDetails key={product._id} product={product} />
                ))}
              </tbody>
            </table>
          )}

          <Link to="/AddProducts" className="edit-link">
            <button className="button-5">Add a new Product</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Products;
