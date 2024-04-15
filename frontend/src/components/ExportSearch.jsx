import React, { useState, useMemo } from 'react';
import { useExportsContext } from '../hooks/useExportsContext';
import ExportDetails from './ExportDetails'; // Import ExportDetails component

const ExportSearch = () => {
  const { exports } = useExportsContext(); // Get exports from context

  const [searchQuery, setSearchQuery] = useState(''); // State to store search query
  const [selectedMonth, setSelectedMonth] = useState(''); // State to store selected month

  // Memoized filtered exports
  const filteredExports = useMemo(() => {
    if (!exports) return []; // Return empty array if exports is null or undefined

    // Filter exports based on search query and selected month
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

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle filter by month
  const handleFilterByMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const printOrder = () => {
    // Hide unnecessary elements before printing
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });

    window.print(); // Print the document

    // Restore button visibility after printing
    buttons.forEach(button => {
        button.style.display = 'block';
    });
  };

  return (
    <div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by order ID"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Filter by month dropdown */}
      <select value={selectedMonth} onChange={handleFilterByMonth}>
        <option value="">Filter by month</option>
        <option value="2024-01-01">January</option>
        <option value="2024-02-01">February</option>
        <option value="2024-03-01">March</option>
        <option value="2024-04-01">April</option>
        <option value="2024-05-01">May</option>
        <option value="2024-06-01">June</option>
        <option value="2024-07-01">July</option>
        <option value="2024-08-01">August</option>
        <option value="2024-09-01">September</option>
        <option value="2024-10-01">October</option>
        <option value="2024-11-01">November</option>
        <option value="2024-12-01">December</option>
        {/* Add more options for other months */}
      </select>

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

      <button onClick={printOrder}>Download Report</button>
    </div>
  );
};

export default ExportSearch;
