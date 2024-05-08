import React, { useState, useMemo } from 'react';
import { useExportsContext } from '../hooks/useExportsContext';
import ExportDetails from './ExportDetails';
import { Button, Select, MenuItem,InputLabel } from '@mui/material';

const ExportsRepo = () => {
  const { exports } = useExportsContext();
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredExports = useMemo(() => {
    if (!exports) return [];

    let filtered = exports;
    if (selectedMonth) {
      const month = new Date(selectedMonth).getMonth();
      filtered = filtered.filter(exportt => {
        const exportDate = new Date(exportt.createdAt);
        return exportDate.getMonth() === month;
      });
    }
    return filtered;
  }, [exports, selectedMonth]);

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
      {/* Filter by month dropdown */}
      <InputLabel>Month</InputLabel>
      <Select
        value={selectedMonth}
        onChange={handleFilterByMonth}
        fullWidth
        label="Filter by month"
        variant="outlined"
        sx={{mb: 5 }}
      >
        <MenuItem value="">
          <em>Filter by month</em>
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

      {/* Display filtered exports */}
      {filteredExports.length > 0 ? (
        <div>
          {filteredExports.map(exportt => (
            <ExportDetails key={exportt._id} exportt={exportt} />
          ))}
        </div>
      ) : (
        <p>No exports found.</p>
      )}

      {/* Button to download report */}
      <Button variant="contained" onClick={printOrder}>
        Download Report
      </Button>
    </div>
  );
};

export default ExportsRepo;