import React, { useState } from "react";
import { useDisLogin } from "../hooks/useDisLogin";
import NavbarStart from "../components/NavbarStart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const DisLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const { disLogin, isLoading, error } = useDisLogin();
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        await disLogin(email, password);
    };

    return (
<div className="login-container">
  <NavbarStart />
<form className="login-form" onSubmit={handleSubmit} autoComplete="off">
  <h3>Distributor Login</h3>

  <label htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    className="login-input"
    onChange={(e) => setEmail(e.target.value)}
    value={email}
  />

  <label htmlFor="password">Password:</label>
  <div className="password-input">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      className="login-input"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="eye-button"
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="eye-icon" />
    </button>
  </div>

  <button disabled={isLoading} className="login-button">
    Login
  </button>
  {error && <div className="error">{error}</div>}
</form>
</div>
    );
};

export default DisLogin;