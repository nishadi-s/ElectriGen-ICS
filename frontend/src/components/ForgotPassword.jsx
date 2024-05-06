import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import login_back from "../pages/img/login_back.png"; // Background image

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      if (response.data.Status === 'Email sent successfully') {
        setMessage('Email sent successfully. Please check your inbox.');
        setTimeout(() => {
          navigate('/new-login');
        }, 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${login_back})`,
        backgroundSize: "cover",
        padding: "20px",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send
              </Button>
            </form>
            {message && (
              <Typography variant="body1" align="center" style={{ marginTop: '10px', color: '#007bff' }}>
                {message}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ForgotPassword;


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      if (response.data.Status === 'Email sent successfully') {
        navigate('/new-login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
         
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;*/