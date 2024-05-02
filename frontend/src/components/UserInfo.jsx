import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background_user from "../pages/img/background_user.jpg";
import Navbar_Pay from "./Navbar-uvi";
import { TextField, InputAdornment, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to delete user
      await axios.delete(`/api/users/${id}`);

      // Remove the deleted user from the local state
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to user update page with user ID
    navigate(`/update-user/${id}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Navbar_Pay>
      <>
        <style>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-image: url('${background_user}');
              background-size: cover;
              background-position: center;
            }

            .container {
              margin: 20px;
            }

            .user-header {
              text-align: left;
  width: 100vw;
  padding: 17px 20px;
  background-color: #233066;
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 30px;
  margin-top: -20px;
  margin-left: -20px;
  border-radius: 0px 10px 0px 10 px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            }

            .search-bar {
              background-color: #fff;
              margin-left: 1000px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            th, td {
              padding: 12px 15px;
              text-align: left;
              border-bottom: 1px solid #ddd;
              transition: background-color 0.3s;
            }

            th {
              background-color: #f2f2f2;
              font-weight: bold;
              color: #333;
            }

            td {
              background-color: #fff;
              color: #555;
            }

            tr:nth-child(even) td {
              background-color: #f9f9f9;
            }

            tr:last-child td {
              border-bottom: none;
            }

            .action-buttons {
              display: flex;
              gap: 5px;
            }

            .edit-button {
              padding: 8px 12px;
              border: none;
              border-radius: 5px;
              background-color: #0056b3;
              color: #fff;
              cursor: pointer;
              transition: background-color 0.3s;
            }

            .edit-button:hover {
              background-color: #004080;
            }

            .delete-button {
              padding: 8px 12px;
              border: none;
              border-radius: 5px;
              background-color: #dc3545;
              color: #fff;
              cursor: pointer;
              transition: background-color 0.3s;
            }

            .delete-button:hover {
              background-color: #bb2d3b;
            }

            .edit-button:focus,
            .delete-button:focus {
              outline: none;
            }
          `}
        </style>
        <div className="user-header">
          <h2>User Details</h2>
          <TextField
            className="search-bar"
            variant="outlined"
            placeholder="Search by Email"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="container">
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.dateOfBirth}</TableCell>
                    <TableCell>
                      <div className="action-buttons">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdate(user._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No users found</p>
          )}
        </div>
      </>
    </Navbar_Pay>
  );
};

export default UserInfo;







/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar_Pay from "./Navbar-uvi";
import {
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to delete user
      await axios.delete(`/api/users/${id}`);

      // Remove the deleted user from the local state
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to user update page with user ID
    navigate(`/update-user/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Navbar_Pay>
      <div>
        <Typography variant="h2">User Details</Typography>
        {users.length > 0 ? (
          <List>
            {users.map((user) => (
              <ListItem key={user._id}>
                <ListItemText
                  primary={`Name: ${user.name}`}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2">Email: {user.email}</Typography>
                      <Typography variant="body2">Phone Number: {user.phoneNumber}</Typography>
                      <Typography variant="body2">Address: {user.address}</Typography>
                      <Typography variant="body2">Role: {user.role}</Typography>
                      <Typography variant="body2">Age: {user.age}</Typography>
                      <Typography variant="body2">Date of Birth: {user.dateOfBirth}</Typography>
                    </React.Fragment>
                  }
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => handleUpdate(user._id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No users found</Typography>
        )}
      </div>
    </Navbar_Pay>
  );
};

export default UserInfo;
*/