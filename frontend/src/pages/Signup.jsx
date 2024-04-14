import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Swal from 'sweetalert2';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call the signup function with email, password, employeeId, and contactNumber
    await signup(email, password, employeeId, contactNumber);

    // Display SweetAlert after successful sign-up
    if (!error) {
      Swal.fire({
        title: 'Success!',
        text: 'Sign-up successful.',
        icon: 'success',
        timer: 2000, // Close after 2 seconds
        showConfirmButton: false
      });
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
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
      <label>Employee ID:</label>
      <input 
        type="text" 
        onChange={(e) => setEmployeeId(e.target.value)} 
        value={employeeId} 
      />
      <label>Contact Number:</label>
      <input 
        type="text" 
        onChange={(e) => setContactNumber(e.target.value)} 
        value={contactNumber} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
