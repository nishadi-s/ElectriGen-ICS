import React, { useState, useMemo } from 'react';
import { useImportersContext } from '../hooks/useImportersContext';
import ImporterDetails from './ImporterDetails'; 

const ImporterSearch = () => {
  const { importers } = useImportersContext(); // Get importers from context

  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  // Memoized filtered exports
  const filteredImporters = useMemo(() => {
    if (!importers) return []; // Return empty array if importers is null or undefined

    // Filter exports based on search query
    return importers.filter(importer =>
        importer.importerID.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [importers, searchQuery]);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by importer ID"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Display filtered exports */}
      {filteredImporters.length > 0 ? (
        <div>
        {filteredImporters.map(filteredImporters => (
          <ImporterDetails key={filteredImporters._id} importer={filteredImporters} />
        ))}
      </div>
    ) : (
      <p>No importers found.</p>
    )}
  </div>
);
};
export default ImporterSearch;