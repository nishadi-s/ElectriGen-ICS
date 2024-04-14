import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
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
                            <Button component={Link} to="/salary-details" color="inherit">Salar Management</Button>
                            <Button onClick={handleClick} color="inherit">Log out</Button>
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
    );
}

export default Navbar;
