
import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

const roles = [
  'Inventory Manager',
  'Distributor Manager',
  'Showroom Manager',
  'Donation Manager',
  'Export Manager',
  'Supplier Manager',
  'User Manager'
];

const bonusReasons = [
  'Exceptional performance',
  'Meeting sales targets',
  'Completion of special project',
  'Customer satisfaction',
  'Years of service',
  'Recognition of achievements',
  'Team performance',
  'Innovation and creativity',
  'No bonus added'
];

const SalaryForm = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [base, setBase] = useState('');
  const [otRate, setOtRate] = useState('');
  const [otHours, setOtHours] = useState('');
  const [bonus, setBonus] = useState('');
  const [reason, setReason] = useState('');
  const [finalSalary, setFinalSalary] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validations
    if (!fname || !lname || !email || !role || !base || !otRate || !otHours || !bonus || !reason) {
      setError("All fields are required");
      return;
    }
  
    // Validate numerical inputs
    const numericalFields = [base, otRate, otHours, bonus];
    const areNumericalInputsValid = numericalFields.every(field => !isNaN(field) && field !== '');
    if (!areNumericalInputsValid) {
      setError("Numeric fields must contain valid numbers");
      return;
    }
  
    // Validate email format
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }
  
    // Calculate final salary
    const calculatedFinalSalary = Number(base) + (Number(otRate) * Number(otHours)) + Number(bonus);
  
    const salaryData = {
      fname,
      lname,
      email,
      role,
      base,
      otRate,
      otHours,
      bonus,
      reason,
      finalSal: calculatedFinalSalary
    };
  
    try {
      const response = await fetch('/api/salaries', {
        method: 'POST',
        body: JSON.stringify(salaryData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.error);
      }
  
      // Reset form fields and error
      setFname('');
      setLname('');
      setEmail('');
      setRole('');
      setBase('');
      setOtRate('');
      setOtHours('');
      setBonus('');
      setReason('');
      setError(null);
      setFinalSalary(calculatedFinalSalary);
  
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'New salary added successfully!'
      });
    } catch (error) {
      setError(error.message);
    }
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle change for First Name field
  const handleFnameChange = (e) => {
    const input = e.target.value;
    // Only allow letters in the input
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setFname(input);
    }
  };

  // Handle change for Last Name field
  const handleLnameChange = (e) => {
    const input = e.target.value;
    // Only allow letters in the input
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setLname(input);
    }
  };
  
  return (

    <form onSubmit={handleSubmit}>
   <Typography variant="h5" style={{
      textAlign: 'left',
      width: '100vw',
      padding: '17px 20px',
      backgroundColor: '#233066',
      color: '#fff',
      fontSize: '2.5rem',
      marginBottom: '30px',
      marginTop: '-20px',
      marginLeft: '-20px',
      borderRadius: '0px 10px 0px 10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      Add a New Salary
    </Typography>

      <div style={{ marginTop: '10px', maxWidth: '500px', padding: '40px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', margin: 'auto' }}>

        <TextField
          label="First Name"
          variant="outlined"
          value={fname}
          onChange={handleFnameChange}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          value={lname}
          onChange={handleLnameChange}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          select
          label="Role"
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Base Salary"
          variant="outlined"
          type="number"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Overtime Rate"
          variant="outlined"
          type="number"
          value={otRate}
          onChange={(e) => setOtRate(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Overtime Hours"
          variant="outlined"
          type="number"
          value={otHours}
          onChange={(e) => setOtHours(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Bonus"
          variant="outlined"
          type="number"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
          select
          label="Reason for Bonus"
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          {bonusReasons.map((reason) => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Salary
        </Button>
      </div>

      {error && <div className="error" style={{ marginTop: '20px' }}>{error}</div>}
    </form>
   
  );
};

export default SalaryForm;

/*

import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

const roles = [
  'Inventory Manager',
  'Distributor Manager',
  'Showroom Manager',
  'Donation Manager',
  'Export Manager',
  'Supplier Manager',
  'User Manager'
];

const bonusReasons = [
  'Exceptional performance',
  'Meeting sales targets',
  'Completion of special project',
  'Customer satisfaction',
  'Years of service',
  'Recognition of achievements',
  'Team performance',
  'Innovation and creativity',
  'No bonus added'
];

const SalaryForm = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [base, setBase] = useState('');
  const [otRate, setOtRate] = useState('');
  const [otHours, setOtHours] = useState('');
  const [bonus, setBonus] = useState('');
  const [reason, setReason] = useState('');
  const [finalSalary, setFinalSalary] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validations
    if (!fname || !lname || !email || !role || !base || !otRate || !otHours || !bonus || !reason) {
      setError("All fields are required");
      return;
    }
  
    // Validate numerical inputs
    const numericalFields = [base, otRate, otHours, bonus];
    const areNumericalInputsValid = numericalFields.every(field => !isNaN(field) && field !== '');
    if (!areNumericalInputsValid) {
      setError("Numeric fields must contain valid numbers");
      return;
    }
  
    // Validate email format
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }
  
    // Calculate final salary
    const calculatedFinalSalary = Number(base) + (Number(otRate) * Number(otHours)) + Number(bonus);
  
    const salaryData = {
      fname,
      lname,
      email,
      role,
      base,
      otRate,
      otHours,
      bonus,
      reason,
      finalSal: calculatedFinalSalary
    };
  
    try {
      const response = await fetch('/api/salaries', {
        method: 'POST',
        body: JSON.stringify(salaryData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.error);
      }
  
      // Reset form fields and error
      setFname('');
      setLname('');
      setEmail('');
      setRole('');
      setBase('');
      setOtRate('');
      setOtHours('');
      setBonus('');
      setReason('');
      setError(null);
      setFinalSalary(calculatedFinalSalary);
  
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'New salary added successfully!'
      });
    } catch (error) {
      setError(error.message);
    }
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle change for First Name field
  const handleFnameChange = (e) => {
    const input = e.target.value;
    // Only allow letters in the input
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setFname(input);
    }
  };

  // Handle change for Last Name field
  const handleLnameChange = (e) => {
    const input = e.target.value;
    // Only allow letters in the input
    if (/^[a-zA-Z]*$/.test(input) || input === '') {
      setLname(input);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Add a New Salary</Typography>

      <Grid container spacing={2}>
       
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            value={fname}
            onChange={handleFnameChange}
            fullWidth
          />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            value={lname}
            onChange={handleLnameChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Role"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Base Salary"
            variant="outlined"
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            fullWidth
          />
        </Grid>

      
        <Grid item xs={12} sm={6}>
          <TextField
            label="Overtime Rate"
            variant="outlined"
            type="number"
            value={otRate}
            onChange={(e) => setOtRate(e.target.value)}
            fullWidth
          />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <TextField
            label="Overtime Hours"
            variant="outlined"
            type="number"
            value={otHours}
            onChange={(e) => setOtHours(e.target.value)}
            fullWidth
          />
        </Grid>

    
        <Grid item xs={12} sm={6}>
          <TextField
            label="Bonus"
            variant="outlined"
            type="number"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Reason for Bonus"
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          >
            {bonusReasons.map((reason) => (
              <MenuItem key={reason} value={reason}>
                {reason}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Salary
          </Button>
        </Grid>
      </Grid>

   
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SalaryForm;*/
