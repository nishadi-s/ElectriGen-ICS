import '../exports.css';
import { useExportsContext } from '../hooks/useExportsContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Typography, Button, IconButton, Paper,Grid } from "@mui/material"; // Import Material-UI components
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon from Material-UI
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon from Material-UI
//import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon from Material-UI
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'; // Import formatDistanceToNow from date-fns

//date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format } from 'date-fns';

import Swal from 'sweetalert2'; // Import SweetAlert


const ExportDetails = ({ exportt }) => {
  const { dispatch } = useExportsContext();

  const handleClick = async () => {
      // Display confirmation dialog
      Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this export order!',
          icon: 'warning',
          cancelButtonColor: '#1976D2',
          confirmButtonColor: '#F44336',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  // If confirmed, proceed with deletion
                  const response = await fetch('/api/export/' + exportt._id, {
                      method: 'DELETE'
                  });
                  const json = await response.json();

                  if (response.ok) {
                      dispatch({ type: 'DELETE_EXPORT', payload: json });
                      Swal.fire({
                          title: 'Deleted!',
                          text: 'Export order has been deleted.',
                          icon: 'success',
                      });
                  } else {
                      Swal.fire({
                          title: 'Error!',
                          text: 'Failed to delete the export order.',
                          icon: 'error'
                      });
                  }
              } catch (error) {
                  console.error('Error deleting export order:', error);
                  Swal.fire({
                      title: 'Error!',
                      text: 'An error occurred while deleting the export order.',
                      icon: 'error'
                  });
              }
          }
      });
  };

  return (
      <Paper elevation={3} style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '10px' }}>
          <Typography variant="h5" gutterBottom>{exportt.exportOrderID}</Typography>
          <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                  <Typography><strong>Importer ID:</strong> {exportt.importer}</Typography>
                  {exportt.items.map((item, index) => (
                      <div key={index}>
                          <Typography><strong>Item {index + 1}:</strong> {item.itemID}</Typography>
                          <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                      </div>
                  ))}
              </Grid>
              <Grid item xs={12} md={6}>
                  <Typography><strong>Total Cost (In Rs.):</strong> {exportt.totalCost}</Typography>
                  <Typography><strong>Status:</strong> {exportt.status}</Typography>
                  <Typography><strong>Created:</strong> {format(new Date(exportt.createdAt), 'MMMM dd, yyyy')}</Typography>

              </Grid>
          </Grid>
          <div style={{ marginTop: '1rem' }}>
              <IconButton onClick={handleClick} color="error">
                  <DeleteIcon />
              </IconButton>
              <Link to={`/UpdateExports/${exportt._id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button>
              </Link>
          </div>
      </Paper>
  );
}

export default ExportDetails;