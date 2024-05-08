import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import background_user from "../pages/img/background_user.jpg";
import Navbar_Pay from './Navbar-uvi';


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
        navigate('/user-details'); // Navigate to the home page or any other desired route
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating the user details.');
    }
  };

  return (<Navbar_Pay>
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-image:  url('${background_user}');
            background-size: cover;
            background-position: center;
          }
          .signup-container {
            max-width: 500px;
            padding: 40px;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.7);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            margin: auto;
          }
        `}
      </style>
      
      <h2 style={{
      textAlign: 'left',
      width: '100vw',
      padding: '17px 20px',
      backgroundColor: '#233066',
      color: '#fff',
      fontSize: '2.5rem',
      marginBottom: '30px',
      marginTop: '-20px',
      marginLeft: '-20px',
      borderRadius: '0px 10px 0px 10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      Edit User Details
    </h2>
    <div className="signup-container">
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
               type="number"
               name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Distributor Manager">Distributor Manager</option>
                <option value="Showroom Manager">Showroom Manager</option>
                <option value="Donation Manager">Donation Manager</option>
                <option value="Export Manager">Export Manager</option>
                <option value="Supplier Manager">Supplier Manager</option>
                <option value="User Manager">User Manager</option>
              </select>
            </div>
            <button type="submit">Update</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
    </Navbar_Pay>
  );
};

export default UpdateUser;



/*import React, { useState, useEffect } from 'react';
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
        navigate('/salary-details'); // Navigate to the home page or any other desired route
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

export default UpdateUser;*/
