import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('/user/reset-password', {password });
            if (response.data.status) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Forgot Password</h3>
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

export default ResetPassword;