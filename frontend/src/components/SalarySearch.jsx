import React, { useState } from "react";
import { Table, TableCell, TableRow, TextField } from '@mui/material';
import { useSalaryContext } from '../hooks/useSalaryContext';

const SalarySearch = ({ salary }) => {
  const { dispatch } = useSalaryContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSalary = salary.filter(salaryItem =>
    salaryItem.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="salary-details">
      <TextField
        label="Search by Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table>
        {/* Render filtered salary details */}
        {filteredSalary.length > 0 ? (
          filteredSalary.map((salaryItem) => (
            <TableRow key={salaryItem._id}>
              {/* Render salary details */}
              {/* You can render the salary details here */}
              <TableCell>{salaryItem.email}</TableCell>
              {/* Add other table cells for other salary details */}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2}>No matching records found.</TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  );
};

export default SalarySearch;
