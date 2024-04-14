import React, { useState } from "react";
import { Table, TableCell, TableRow, Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { useSalaryContext } from '../hooks/useSalaryContext';
import { Link } from 'react-router-dom';

const SalaryDetails = ({ salary }) => {
  const { dispatch } = useSalaryContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async () => {
    // delete functionality remains the same
  };

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
              {/* ... */}
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

export default SalaryDetails;
