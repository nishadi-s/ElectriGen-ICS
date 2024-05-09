import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useProductContext } from "../hooks/useProductsContext";
import ProductSearch from "../components/ProductSearch";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "../senith.css";

const ProductsView = () => {
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
    <div className="home">
      <div className="products">
        <div className="production-header">
          <h1>Product Catalog</h1>
        </div>
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
                <tr
                  key={product._id}
                  style={{
                    backgroundColor:
                      product.quantity < 100 ? "#f01313" : "inherit",
                  }}
                >
                  <td>{product.itemCode}</td>
                  <td>{product.name}</td>
                  <td>{product.color}</td>
                  <td>{product.category}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsView;
