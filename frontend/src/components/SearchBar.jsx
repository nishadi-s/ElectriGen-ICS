import React from 'react';
import { FaSearch } from 'react-icons/fa';

// SearchBar with onChange
const SearchBar = ({ onChange }) => {
  const handleSearch = (e) => {
    onChange(e.target.value); 
  };

  return (
    <div className="input-search-wrapper">
      <FaSearch id="search-icon" />
      <input
        className="input-search"
        type="text"
        placeholder="Search Invoice"
        onChange={handleSearch} 
      />
    </div>
  );
};

export default SearchBar;
