import React, { useState } from "react";
import { useDisLogin } from "../hooks/useDisLogin";
import NavbarStart from "../components/NavbarStart";

const DisLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { disLogin, isLoading, error } = useDisLogin();
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        await disLogin(email, password);
    };

    return (
        <div>
            <NavbarStart/>
        <form className="login" onSubmit={handleSubmit}>
            <h3>Distributor Login</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    );
};

export default DisLogin;