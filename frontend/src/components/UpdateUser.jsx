import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Error fetching user details.');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/users/${id}`, user);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User details updated successfully!',
        });
        navigate('/'); // Navigate to the home page or any other desired route
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating the user details.');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit User Details
        </Typography>
        {user ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              {/* Add more text fields for other user details */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Loading user details...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UpdateUser;
