import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { formatDistanceToNow } from 'date-fns';

const ImporterDetails = ({ importer }) => {
    return (
        <div style={{ width: '1250px' }}> {/* Set a fixed width for the container */}
            <Paper elevation={3} style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" gutterBottom>{importer.importerID}</Typography>
                <Typography variant="body1"><strong>Importer Name: </strong>{importer.importerName}</Typography>
                <Typography variant="body1"><strong>Address: </strong>{importer.address}</Typography>
                <Typography variant="body1"><strong>Contact Number: </strong>{importer.contactNumber}</Typography>
                <Typography variant="body1"><strong>Email: </strong>{importer.email}</Typography>
                <Typography variant="body1"><strong>Created: </strong>{formatDistanceToNow(new Date(importer.createdAt), { addSuffix: true })}</Typography>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={`/ImporterUpdate/${importer._id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button>
                    </Link>
                </div>
            </Paper>
        </div>
    );
}

export default ImporterDetails;
