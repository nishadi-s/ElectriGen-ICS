import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the profile icon
import ExportsNavBar from "./ExportsNavBar";

function ExportsProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const userId = "6638e4ff59a712c2f8af5081"; // The user ID you want to fetch details for shanali

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make a GET request to fetch user details from the backend API
        const response = await axios.get(
          `http://localhost:4000/api/users/${userId}`
        );
        setUserProfile(response.data); // Assuming the response.data contains the user profile details
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <ExportsNavBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "20px",
        }}
      >
        {userProfile ? (
          <Card
            style={{
              maxWidth: "1000px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <Avatar
                style={{
                  width: "150px",
                  height: "150px",
                  margin: "20px auto",
                  backgroundColor: "#233066",
                }}
              >
                <AccountCircleIcon
                  style={{ fontSize: "100px", color: "#fff" }}
                />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {userProfile.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {userProfile.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Contact Number: {userProfile.phoneNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address: {userProfile.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Role: {userProfile.role}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Age: {userProfile.age}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" style={{ color: "#fff" }}>
            Loading profile...
          </Typography>
        )}
      </div>
    </ExportsNavBar>
  );
}

export default ExportsProfile;
