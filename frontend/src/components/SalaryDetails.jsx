import React from "react";
import { Table, TableCell, TableRow, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useSalaryContext } from '../hooks/useSalaryContext';
import { Link } from 'react-router-dom';

const SalaryDetails = ({ salary }) => {
  const { dispatch } = useSalaryContext();

  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/salaries/${salary._id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Dispatch delete action without refreshing
            dispatch({ type: 'DELETE_SALARY', payload: salary._id });
            Swal.fire({
              title: 'Deleted!',
              text: 'Your salary record has been deleted.',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the salary record.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting salary:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the salary record.',
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="salary-details">
      <Table>
        <TableRow>
          <TableCell><strong>Full Name:</strong></TableCell>
          <TableCell>{salary.fname} {salary.lname}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Email:</strong></TableCell>
          <TableCell>{salary.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Role:</strong></TableCell>
          <TableCell>{salary.role}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Base Salary:</strong></TableCell>
          <TableCell>${salary.base}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Overtime Rate:</strong></TableCell>
          <TableCell>{salary.otRate}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Overtime Hours:</strong></TableCell>
          <TableCell>{salary.otHours}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Bonus:</strong></TableCell>
          <TableCell>${salary.bonus}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Reason:</strong></TableCell>
          <TableCell>{salary.reason}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Final Salary:</strong></TableCell>
          <TableCell>${salary.finalSal}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            <Button variant="contained" color="primary" component={Link} to={`/UpdateSalary/${salary._id}`}>Update</Button>
            <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default SalaryDetails;


