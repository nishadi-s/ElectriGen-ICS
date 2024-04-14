import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [password, setPassword] = useState("");  
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/user/forgot-password', { email });
            if (response.data.status) {
                alert('Check your email for password reset instructions.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Reset Password</h3>
           
            <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
            <button type="submit">Send</button>
        </form>
    );
};

export default ForgotPassword;



