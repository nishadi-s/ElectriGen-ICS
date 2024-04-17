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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Change this number as needed

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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ProductionNavbar>
      <div className="home">
        {/*<div className="production-header">
          <h1>Product Inventory</h1>
        </div>*/}
        <div className="products">
          <div className="products-search">
            <ProductSearch onSearch={handleSearch} />
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-results">
              No products could be found with the term "{searchTerm}"
            </p>
          )}

          {currentProducts.length > 0 && (
            <table className="transparent-table">
              <thead className="table-header">
                <tr>
                  <th scope="col">Product Code</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Colors</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Available Quantity</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <ProductDetails key={product._id} product={product} />
                ))}
              </tbody>
            </table>
          )}
          <tfoot className="pagination-bar">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={() => paginate(1)}>
                    1
                  </button>
                </li>
                {/* Render additional page numbers here */}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(filteredProducts.length / productsPerPage)
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </tfoot>

          <Link to="/AddProducts" className="edit-link">
            <button className="button-5">Add a new Product</button>
          </Link>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Products;