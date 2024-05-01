// ProductSearch.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="input-search-wrapper">
      <FaSearch id="search-icon" />
      <input
        className="input-search"
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleFilter}
      />
    </div>
  );
};

export default ProductSearch;
