import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableRow, TableCell } from '@mui/material';

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const userId = "66335360469a360afdbde69a"; // The user ID you want to fetch details for

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make a GET request to your backend API endpoint with the user ID
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        setUserProfile(response.data); // Assuming the response.data contains the user profile details
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, [userId]);
  

  return (
    <div>
      {userProfile ? (
        <table>
          <tbody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{userProfile.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{userProfile.email}</TableCell>
            </TableRow>
            {/* Add more rows for other user details as needed */}
          </tbody>
        </table>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
