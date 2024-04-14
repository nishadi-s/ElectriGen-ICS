import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// Import Bootstrap CSS for Navbar component
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom CSS styles for Navbar
import '../user-Manage.css';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header className="navbar-container">
            <div className="container">
                <Link to="/" className="navbar-logo">
                    ElectricGen
                </Link>
                <nav className="navbar-links">
                    <div className="navbar-links-inner">
                        {user ? (
                            <>
                                <span className="navbar-user-email">{user.email}</span>
                                
                                <Link to="/profile" className="navbar-link">Profile</Link>
                                <Link to="/distributor" className="navbar-link">Distributors</Link>
                                
                                <Link to="/dashboard" className="navbar-link">Dashboard</Link> 
                                <Link to="/managers" className="navbar-link">Managers</Link> 
                                <Link to="/account-management" className="navbar-link">Account Management</Link> 
                                <button onClick={handleClick} className="navbar-button">Log out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-link">Login</Link>
                                <Link to="/signup" className="navbar-link">Signup</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

