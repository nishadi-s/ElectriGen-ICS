import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, Grid, TextField, Typography } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        // Preventing form submission from refreshing the page
        e.preventDefault();

        await login(email, password);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <form className="login" onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>Login</Typography>
                    <TextField
                        label="Email"
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        fullWidth
                        style={{ marginTop: '1rem' }}
                    >
                        Log in
                    </Button>
                    {error && <Typography variant="body2" color="error" style={{ marginTop: '0.5rem' }}>{error}</Typography>}
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;
