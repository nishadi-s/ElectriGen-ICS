import React, { useState, useEffect } from "react";
import ProductionNavbar from "../components/ProductionNavbar";

const Production = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data); // Assuming data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <ProductionNavbar>
      <div>
        <h1>Factory Production</h1>
        <form>
          <div className="form-group">
            <label htmlFor="product">Select Product:</label>
            <select
              id="product"
              name="product"
              className="form-control"
              value={selectedProduct}
              onChange={handleChange}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </ProductionNavbar>
  );
};

export default Production;
