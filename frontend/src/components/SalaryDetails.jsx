import React from "react";
import { TableCell, TableRow, IconButton, Typography } from '@mui/material'; // Import necessary components from Material-UI
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
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
      confirmButtonColor: '#1976D2',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/salaries/${salary._id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
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
    <>
      <TableRow>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Full Name:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{salary.fname} {salary.lname}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Email:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{salary.email}</Typography>
        </TableCell>
    
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Role:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{salary.role}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Base Salary:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">${salary.base}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Overtime Rate:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{salary.otRate}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Overtime Hours:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{salary.otHours}</Typography>
        </TableCell>
      
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Bonus:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">${salary.bonus}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Reason:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{salary.reason}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography variant="body1" color="primary"><strong>Final Salary:</strong></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">${salary.finalSal}</Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <IconButton component={Link} to={`/UpdateSalary/${salary._id}`} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SalaryDetails;
