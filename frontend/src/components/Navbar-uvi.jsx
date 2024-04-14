import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for controlling drawer open/close

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
                        ElectricGen
                    </Typography>
                    <div>
                        {user ? (
                            <>
                                <Typography variant="body1" className="navbar-user-email" sx={{ mr: 2 }}>
                                    {user.email}
                                </Typography>
                                <Button component={Link} to="/salary-details" color="inherit">Salary Management</Button>
                                <Button onClick={logout} color="inherit">Log out</Button>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" color="inherit">Login</Button>
                                <Button component={Link} to="/signup" color="inherit">Signup</Button>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/salary-details"> {/* Change the route to "/salary-details" */}
                        <ListItemText primary="Salary Management" />
                    </ListItem>
                    {/* Add more sidebar items as needed */}
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;
