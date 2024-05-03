import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import login_back from "../pages/img/login_back.png"; // Background image

function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/reset-password/${id}/${token}`, { password })
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/new-login');
        }
      }).catch(err => {
        console.log('Error:', err.response.data); // Log the error message received from the server
      });
  }

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
              Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="password"
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetPassword;

/*import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/new-login')
               
            }
        }).catch(err => {
            console.log('Error:', err.response.data); // Log the error message received from the server
          });
    }
    
      

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ResetPassword;*/