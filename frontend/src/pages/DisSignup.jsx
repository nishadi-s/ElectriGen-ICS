import React, { useState } from "react";
import { useDisSignup } from "../hooks/useDisSignup";
import NavbarStart from "../components/NavbarStart";


const DisSignup = () => {
  const [distributorName, setDistributorName] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { disSignup, isLoading, error } = useDisSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await disSignup(distributorName, address, companyName, email, password);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <NavbarStart />
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Distributor Sign up</h3>

        <label>Distributor's Name:</label>
        <input
          type="text"
          onChange={(e) => setDistributorName(e.target.value)}
          value={distributorName}
        />

        <label>Address:</label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />

        <label>Company Name:</label>
        <input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />

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
    </div>
  );
};

export default DisSignup;