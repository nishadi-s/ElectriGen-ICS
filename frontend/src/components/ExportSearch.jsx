import React, { useState, useMemo } from 'react';
import { useExportsContext } from '../hooks/useExportsContext';
import ExportDetails from './ExportDetails';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 

const ExportSearch = () => {
  const { exports } = useExportsContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredExports = useMemo(() => {
    if (!exports) return [];

    let filtered = exports;
    if (searchQuery) {
      filtered = filtered.filter(exportt =>
        exportt.exportOrderID.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMonth) {
      const month = new Date(selectedMonth).getMonth();
      filtered = filtered.filter(exportt => {
        const exportDate = new Date(exportt.createdAt);
        return exportDate.getMonth() === month;
      });
    }
    return filtered;
  }, [exports, searchQuery, selectedMonth]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterByMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const printOrder = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });

    window.print();

    buttons.forEach(button => {
        button.style.display = 'block';
    });
  };

  return (
    <div>
      
      <TextField
        type="text"
        label="Search by order ID"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth // Make the TextField take full width
        size="medium" // Increase the size of the TextField
        sx={{ mb: 2 }} // Add margin bottom for spacing
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          )
        }}
      />

     
      <FormControl variant="outlined" sx={{ width: '20%', mb: 2 }}> 
        <InputLabel>Filter by month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={handleFilterByMonth}
          label="Filter by month"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="2024-01-01">January</MenuItem>
          <MenuItem value="2024-02-01">February</MenuItem>
          <MenuItem value="2024-03-01">March</MenuItem>
          <MenuItem value="2024-04-01">April</MenuItem>
          <MenuItem value="2024-05-01">May</MenuItem>
          <MenuItem value="2024-06-01">June</MenuItem>
          <MenuItem value="2024-07-01">July</MenuItem>
          <MenuItem value="2024-08-01">August</MenuItem>
          <MenuItem value="2024-09-01">September</MenuItem>
          <MenuItem value="2024-10-01">October</MenuItem>
          <MenuItem value="2024-11-01">November</MenuItem>
          <MenuItem value="2024-12-01">December</MenuItem>
        </Select>
      </FormControl>

      {/* Display filtered exports */}
      {filteredExports.length > 0 ? (
        <div>
          {filteredExports.map(filteredExport => (
            <ExportDetails key={filteredExport._id} exportt={filteredExport} />
          ))}
        </div>
      ) : (
        <p>No exports found.</p>
      )}

      
      <Button variant="contained" onClick={printOrder}>Download Report</Button>
    </div>
  );
};

export default ExportSearch;
