import React from "react";
import { Table, TableBody, TableCell, TableRow, Button, Typography } from '@mui/material';
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
          const json =await response.json();

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
        <TableBody>
          <TableRow>
            <TableCell><strong>Full Name:</strong></TableCell>
            <TableCell><Typography variant="body1">{salary.fname} {salary.lname}</Typography></TableCell>
            <TableCell><strong>Email:</strong></TableCell>
            <TableCell><Typography variant="body1">{salary.email}</Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Role:</strong></TableCell>
            <TableCell><Typography variant="body1">{salary.role}</Typography></TableCell>
            <TableCell><strong>Base Salary:</strong></TableCell>
            <TableCell><Typography variant="body1">${salary.base}</Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Overtime Rate:</strong></TableCell>
            <TableCell><Typography variant="body1">{salary.otRate}</Typography></TableCell>
            <TableCell><strong>Overtime Hours:</strong></TableCell>
            <TableCell><Typography variant="body1">{salary.otHours}</Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Bonus:</strong></TableCell>
            <TableCell><Typography variant="body1">${salary.bonus}</Typography></TableCell>
            <TableCell><strong>Reason:</strong></TableCell>
            <TableCell><Typography variant="body1">{salary.reason}</Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Final Salary:</strong></TableCell>
            <TableCell><Typography variant="body1">${salary.finalSal}</Typography></TableCell>
            <TableCell colSpan={2}>
              <Button variant="contained" color="primary" component={Link} to={`/UpdateSalary/${salary._id}`}>Update</Button>
              <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SalaryDetails;
