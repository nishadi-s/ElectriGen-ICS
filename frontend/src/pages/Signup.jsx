import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button, Grid, TextField, Typography, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [role, setRole] = useState('Employee'); // Default role is 'Employee'
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call the signup function with email, password, employeeId, contactNumber, and role
    await signup(email, password, employeeId, contactNumber, role);

    // Display SweetAlert after successful sign-up
    if (!error) {
      Swal.fire({
        title: 'Success!',
        text: 'Sign-up successful.',
        icon: 'success',
        timer: 2000, // Close after 2 seconds
        showConfirmButton: false
      });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form className="signup" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>Sign Up</Typography>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Employee ID"
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Contact Number"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
            margin="normal"
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
            <MenuItem value="Distributor Manager">Distributor Manager</MenuItem>
            <MenuItem value="Showroom Manager">Showroom Manager</MenuItem>
            <MenuItem value="Donation Manager">Donation Manager</MenuItem>
            <MenuItem value="Export Manager">Export Manager</MenuItem>
            <MenuItem value="Supplier Manager">Supplier Manager</MenuItem>
            <MenuItem value="User Manager">User Manager</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Sign up
          </Button>
          {error && <Typography variant="body2" color="error" style={{ marginTop: '0.5rem' }}>{error}</Typography>}
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;
