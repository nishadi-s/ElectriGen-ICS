import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import SalaryDetails from './SalaryDetails'; // Import SalaryDetails component
import Navbar_Pay from './Navbar-uvi';

const SalarySearch = ({ salary }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter salaries based on search query
  const filteredSalaries = salary.filter(salary =>
    salary.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle salary deletion
  const handleDelete = async (salaryId) => {
    // Your deletion logic
  };

  return (
    <div>
      {/* Search input field */}
      <TextField
        type="text"
        placeholder="Search by email"
        value={searchQuery}
        onChange={handleSearch}
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          )
        }}
      />

      {/* Display filtered salaries */}
      {filteredSalaries.length > 0 ? (
        filteredSalaries.map(filteredSalary => (
          <SalaryDetails key={filteredSalary._id} salary={filteredSalary} handleDelete={handleDelete} />
        ))
      ) : (
        <p>No matching salaries found.</p>
      )}
    </div>
  );
};

export default SalarySearch;