import React, { useState, useMemo } from 'react';
import { useExportsContext } from '../hooks/useExportsContext';
import ExportDetails from './ExportDetails';

const ExportSearch = () => {
  const { exports } = useExportsContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExports = useMemo(() => {
    if (!exports) return [];

    return exports.filter(exportt =>
      exportt.exportOrderID.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [exports, searchQuery]);

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
