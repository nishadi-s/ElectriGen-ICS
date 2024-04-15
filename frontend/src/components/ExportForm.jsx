import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material"; // Import Material-UI components
import { useExportsContext } from "../hooks/useExportsContext";
import Swal from 'sweetalert2'; // Import SweetAlert

const ExportForm = () => {
    const { dispatch } = useExportsContext();
    const [exportOrderID, setExportOrderID] = useState('');
    const [importer, setImporter] = useState('');
    const [itemID, setItemID] = useState('');
    const [quantity, setQuantity] = useState('');
    const [items, setItems] = useState([]);
    const [totalCost, setTotalCost] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const exportOrderIDPattern = /^E\d{3}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!exportOrderIDPattern.test(exportOrderID)) {
            setError('Export Order ID should start with "E" followed by 3 digits (e.g., E123)');
            return;
        }

        const exportt = {
            exportOrderID,
            importer,
            items,
            totalCost,
            status
        };

        const response = await fetch('/api/export', {
            method: 'POST',
            body: JSON.stringify(exportt),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setExportOrderID('');
            setImporter('');
            setItems([]);
            setTotalCost('');
            setStatus('');
            setError('');
            setEmptyFields([]);
            setSuccessMessage('New export order added successfully!');
            dispatch({ type: 'CREATE_EXPORT', payload: json });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'New export order added successfully!'
            });
        }
    };

    const addItem = () => {
        if (itemID && quantity) {
            setItems([...items, { itemID, quantity }]);
            setItemID('');
            setQuantity('');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', borderRadius: '12px' }}>
            <Typography variant="h5" align="center" gutterBottom>Add a New Export Order</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Order ID"
                            variant="outlined"
                            fullWidth
                            value={exportOrderID}
                            onChange={(e) => setExportOrderID(e.target.value)}
                            error={emptyFields.includes('exportOrderID')}
                            helperText={emptyFields.includes('exportOrderID') ? 'Please enter Export Order ID' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Importer"
                            variant="outlined"
                            fullWidth
                            value={importer}
                            onChange={(e) => setImporter(e.target.value)}
                            error={emptyFields.includes('importer')}
                            helperText={emptyFields.includes('importer') ? 'Please enter Importer' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Item ID"
                            variant="outlined"
                            fullWidth
                            value={itemID}
                            onChange={(e) => setItemID(e.target.value)}
                            error={emptyFields.includes('itemID')}
                            helperText={emptyFields.includes('itemID') ? 'Please enter Item ID' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            error={emptyFields.includes('quantity')}
                            helperText={emptyFields.includes('quantity') ? 'Please enter Quantity' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={addItem}>Add Item</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {items.map((item, index) => (
                            <Typography key={index}>{`Item ID: ${item.itemID}, Quantity: ${item.quantity}`}</Typography>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Total Cost (In Rs.)"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={totalCost}
                            onChange={(e) => setTotalCost(e.target.value)}
                            error={emptyFields.includes('totalCost')}
                            helperText={emptyFields.includes('totalCost') ? 'Please enter Total Cost' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            fullWidth
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            error={emptyFields.includes('status')}
                            helperText={emptyFields.includes('status') ? 'Please enter Status' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>Add Order</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {error && <Typography variant="body2" color="error">{error}</Typography>}
                        {successMessage && <Typography variant="body2" style={{ color: 'green' }}>{successMessage}</Typography>}
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default ExportForm;
