import React, { useState, useMemo } from 'react';
import { useExportsContext } from '../hooks/useExportsContext';
import ExportDetails from './ExportDetails'; // Import ExportDetails component
const ExportSearch = () => {
  const { exports } = useExportsContext(); // Get exports from context

  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  // Memoized filtered exports
  const filteredExports = useMemo(() => {
    if (!exports) return []; // Return empty array if exports is null or undefined

    // Filter exports based on search query
    return exports.filter(exportt =>
      exportt.exportOrderID.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [exports, searchQuery]);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
  </div>
);
};
export default ExportSearch;