// Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../senith.css";
import ProductDetails from "../components/ProductDetails";
import { useProductContext } from "../hooks/useProductsContext";
import ProductSearch from "../components/ProductSearch"; // Import ProductSearch component
import ProductionNavbar from "../components/ProductionNavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
    <ProductionNavbar>
      <div className="home">
        <ProductSearch onSearch={handleSearch} />{" "}
        {/* Render ProductSearch component */}
        <div className="products">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              {/* Moved TableHead outside the loop */}
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Colors</TableCell>
                  <TableCell align="right">Total Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Table body with product details remains in ProductDetails */}
                {filteredProducts.map((product) => (
                  <ProductDetails key={product._id} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link to="/AddProducts" className="edit-link">
            <button>Add a new Product</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Products;
