import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material"; // Import Material-UI components
import { useImportersContext } from "../hooks/useImportersContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router
import Swal from 'sweetalert2'; // Import SweetAlert

const ImporterForm = () => {
    const { dispatch } = useImportersContext();
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [importerID, setImporterID] = useState('');
    const [importerName, setImporterName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    // Regular expression for importerID validation (starts with 'I' followed by 3 digits)
    const importerIDPattern = /^I\d{3}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (!importerID || !importerName || !address || !contactNumber || !email) {
            setError('Please fill out all fields');
            return;
        }

        // Validate importerID format
        if (!importerIDPattern.test(importerID)) {
            setError('Importer ID should start with "I" followed by 3 digits (e.g., I123)');
            return;
        }

        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailPattern.test(email)) {
            setError('Invalid email format');
            return; // Stop form submission if email is invalid
        }

        const importer = { importerID, importerName, address, contactNumber, email };

        const response = await fetch('/api/importer', {
            method: 'POST',
            body: JSON.stringify(importer),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setImporterID('');
            setImporterName('');
            setAddress('');
            setContactNumber('');
            setEmail('');
            setError('');
            setEmptyFields([]);
            dispatch({ type: 'CREATE_IMPORTER', payload: json });

            // Redirect to importer description page after successful submission
            navigate(`/ImporterDescription`);
            
            // Display success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'New importer added successfully!'
            });
        }
    }

    // Function to handle change in importer name field
    const handleImporterNameChange = (e) => {
        const value = e.target.value;
        // Check if the input contains only letters
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setImporterName(value);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', borderRadius: '10px' }}>
            <Typography variant="h5" align="center" gutterBottom>Add a New Importer</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Importer ID"
                            variant="outlined"
                            fullWidth
                            value={importerID}
                            onChange={(e) => setImporterID(e.target.value)}
                            error={emptyFields.includes('importerID')}
                            helperText={emptyFields.includes('importerID') ? 'Please enter Importer ID' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={importerName}
                            onChange={handleImporterNameChange} // Changed here
                            error={emptyFields.includes('importerName')}
                            helperText={emptyFields.includes('importerName') ? 'Please enter Name' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            error={emptyFields.includes('address')}
                            helperText={emptyFields.includes('address') ? 'Please enter Address' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            error={emptyFields.includes('contactNumber')}
                            helperText={emptyFields.includes('contactNumber') ? 'Please enter Contact Number' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emptyFields.includes('email')}
                            helperText={emptyFields.includes('email') ? 'Please enter Email' : ''}
                        />
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '2rem' }}>Add Importer</Button>
                {error && <Typography variant="body2" color="error" style={{ marginTop: '1rem' }}>{error}</Typography>}
            </form>
        </Paper>
    );
}

export default ImporterForm;
