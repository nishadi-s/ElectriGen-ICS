import React, { useState } from "react";
import { useDisSignup } from "../hooks/useDisSignup";

const DisSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { disSignup, isLoading, error } = useDisSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await disSignup(email, password);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Distributor Sign up</h3>

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

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DisSignup;