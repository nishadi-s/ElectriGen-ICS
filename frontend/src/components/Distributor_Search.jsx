import React from 'react'
import { FaSearch } from "react-icons/fa"

// Functional component SearchBar with a prop onChange
const SearchBar = ({ onChange }) => {
  return (
    <div className="input-search-wrapper">
      <FaSearch id="search-icon" />
      <input
        className="input-search"
        type="text"
        placeholder="Search orders"
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar // Export SearchBar component
