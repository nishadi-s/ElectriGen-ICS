import React from "react";
import { TableCell, TableRow, IconButton, Typography, Paper, Grid } from '@mui/material';
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
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ color: '#3f51b5' }}>Salary Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <table>
            <tbody>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Full Name:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>{salary.fname} {salary.lname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Email:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>{salary.email}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Role:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>{salary.role}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Base Salary:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>${salary.base}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Overtime Rate:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>{salary.otRate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Overtime Hours:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>{salary.otHours}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Bonus:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>${salary.bonus}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary"><strong>Final Salary:</strong></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ color: '#000' }}>${salary.finalSal}</Typography>
                </TableCell>
              </TableRow>
            </tbody>
          </table>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <IconButton component={Link} to={`/UpdateSalary/${salary._id}`} aria-label="edit">
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default SalaryDetails;