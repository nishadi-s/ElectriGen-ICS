import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import Navbar_Pay from '../components/Navbar-uvi';

const UserDashboard = () => {
  // Hardcoded user data
  const users = [
    {
      name: "Dulari Nisansala",
      email: "donationManager@dev.lk",
      contactNumber: "0717885963",
      address: "No 122/5 Prince Street, 11 City,Colombo",
      role: "Donation Manager",
      age: 23
    },
    {
      name: "Primal Fernando",
      email: "salesManager@dev.lk",
      contactNumber: "0762252511",
      address: "47 Upstaire Old Butcher Street, Colombo",
      role: "Showroom Manager",
      age: 22
    },
    {
      name: "Senith Udara",
      email: "inventoryManager@dev.lk",
      contactNumber: "0762252511",
      address: "No 61, Maliban Street,11, Colombo",
      role: "Inventory Manager",
      age: 22
    },
    
    {
      name: "Uvindya Jayasundara",
      email: "userManager@dev.lk",
      contactNumber: "0762252504",
      address: "4/3, 1st Lane, Pubudu Mawatha, Kurunegala",
      role: "User Manager",
      age: 22
    },
    {
      name: "Dinithi Wickramaraachchi",
      email: "distributorManager@dev.lk",
      contactNumber: "0762252511",
      address: "28/1, Col T G Jayawardena Mawatha,Colombo",
      role: "Distributor Manager",
      age: 22
    },
    {
      name: "Nishadi Jayarathne",
      email: "supplierManager@dev.lk",
      contactNumber: "0787336251",
      address: "No 14, Ruhunu Kala Mawatha, kaluthara",
      role: "Supplier Manager",
      age: 23
    },
    {
      name: "Shanali Rajakaruna",
      email: "exportManager@dev.lk",
      contactNumber: "0717885963",
      address: "N0.833, Sirimawo Bandaranayake Mawatha, Colombo.",
      role: "Export Manager",
      age: 22
    }
    // Add more users here
  ];const background_user = '/img/background_user.jpg'; // Replace with your background image URL

  return (<Navbar_Pay>
    <div style={{ 
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${background_user})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="signup-header" style={{
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
        User Dashboard
      </div>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px'
      }}>
        <Grid container spacing={3}>
          {users.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '15px' }}>
                <CardContent style={{ flex: 1 }}>
                  <Avatar style={{ margin: '0 auto', marginBottom: '20px', width: '100px', height: '100px' }}><PersonIcon style={{ width: '60px', height: '60px' }} /></Avatar>
                  <Typography variant="h5" component="div" align="center" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom align="center">
                    Email: {user.email}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom align="center">
                    Contact Number: {user.contactNumber}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom align="center">
                    Address: {user.address}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom align="center">
                    Role: {user.role}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom align="center">
                    Age: {user.age}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
    </Navbar_Pay>
  );
};

export default UserDashboard;
