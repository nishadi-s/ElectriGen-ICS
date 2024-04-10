import React from 'react';
import { FaSearch } from 'react-icons/fa';

// Functional component SearchBar with a prop onChange
const SearchBar = ({ onChange }) => {
  const handleSearch = (e) => {
    onChange(e.target.value); // Pass the search query to the parent component
  };

  return (
    <div className="input-search-wrapper">
      <FaSearch id="search-icon" />
      <input
        className="input-search"
        type="text"
        placeholder="Search Invoice"
        onChange={handleSearch} // Call handleSearch when input changes
      />
    </div>
  );
};

export default SearchBar;
