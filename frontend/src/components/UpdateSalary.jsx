import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';
import Navbar_Pay from './Navbar-uvi';

const UpdateSalary = () => {
    const { id } = useParams(); // Get the salary ID from the URL params
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [base, setBase] = useState("");
    const [otRate, setOtRate] = useState("");
    const [otHours, setOtHours] = useState("");
    const [bonus, setBonus] = useState(""); 
    const [reason, setReason] = useState("");
    const [finalSal, setFinalSal] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await fetch(`/api/salaries/${id}`);
                const salaryData = await response.json();
                setFname(salaryData.fname);
                setLname(salaryData.lname);
                setEmail(salaryData.email);
                setRole(salaryData.role);
                setBase(salaryData.base);
                setOtRate(salaryData.otRate);
                setOtHours(salaryData.otHours);
                setBonus(salaryData.bonus);
                setReason(salaryData.reason);
                setFinalSal(salaryData.finalSal);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchSalary();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Calculate final salary
        const calculatedFinalSalary = Number(base) + (Number(otRate) * Number(otHours)) + Number(bonus);
    
        const updatedSalary = {
            fname,
            lname,
            email,
            role,
            base,
            otRate,
            otHours,
            bonus,
            reason,
            finalSal: calculatedFinalSalary, // Assign calculated final salary
        };

        // Check if the user tries to update the final salary
       
        try {
            const response = await fetch(`/api/salaries/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedSalary),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Salary details updated successfully!'
                });
                setTimeout(() => navigate('/salary-details'), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorData.error
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while updating the salary details.'
            });
        }
    };
    
    return (<Navbar_Pay>
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Edit Salary Details</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Base Salary"
                                type="number"
                                value={base}
                                onChange={(e) => setBase(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Overtime Rate"
                                type="number"
                                value={otRate}
                                onChange={(e) => setOtRate(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Overtime Hours"
                                type="number"
                                value={otHours}
                                onChange={(e) => setOtHours(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Bonus"
                                type="number"
                                value={bonus}
                                onChange={(e) => setBonus(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Final Salary"
                                type="number"
                                value={finalSal}
                                disabled // Disable the input field for final salary
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Update
                            </Button>
                            {error && <Typography variant="body2" color="error">{error}</Typography>}
                            {successMessage && <Typography variant="body2" color="success">{successMessage}</Typography>}
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
        </Navbar_Pay>
    );
};

export default UpdateSalary;

