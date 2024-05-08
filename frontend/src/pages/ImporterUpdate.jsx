import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import Swal from 'sweetalert2';
import "../exports.css";

const UpdateImporter = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const navigate = useNavigate();
    const [importerID,setimporterID]=useState("");
    const [importerName, setImporterName] = useState("");
    const [address, setAddress] = useState("");
    const [contactNumber, setContactNumber] = useState([]);
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        
        const fetchImporters = async () => {
            try {
                const response = await fetch(`/api/importer/${id}`);
                const importerData = await response.json();
                setimporterID(importerData.importerID);
                setImporterName(importerData.importerName);
                setAddress(importerData.address);
                setContactNumber(importerData.contactNumber);
                setEmail(importerData.email);
                
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchImporters();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if the importer name contains only letters
        const namePattern = /^[a-zA-Z\s]*$/;
        if (!namePattern.test(importerName)) {
            setError("Importer name should contain only letters");
            return;
        }

         // Convert the first letter of the email to lowercase
        const formattedEmail = email.charAt(0).toLowerCase() + email.slice(1);
         // Email validation regex pattern
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

         if (!emailPattern.test(email)) {
             setError("Invalid email address");
             return;
         }

        const updatedImporter = {
            importerID,
            importerName,
            address,
            contactNumber,
            email: formattedEmail,
        };
    
        try {
            const response = await fetch(`/api/importer/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedImporter),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                const updatedExportData = await response.json();
                setimporterID(updatedExportData.importerID);
                setImporterName(updatedExportData.importerName);
                setAddress(updatedExportData.address);
                setContactNumber(updatedExportData.contactNumber);
                setEmail(updatedExportData.email);
                setSuccessMessage('Importer Details updated successfully!');
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Importer Details updated successfully!'
                });
                setTimeout(() => navigate('/ImporterDescription'), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error, "Error updating importer details");
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
                text: 'An error occurred while updating the importer details.'
            });
        }
    };
    
    return (
        <div className="update-importer with-background">
      <div className="update-importer-container">
        <ExportsNavBar>
            <div className="update-importer-form">

                <h2>Edit Importer Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>Importer ID:</label>
                    <input
                        type="text"
                        value={importerID}
                        disabled
                    />
                    <label>Importer Name: </label>
                    <input
                        type="text"
                        value={importerName}
                        onChange={(e) => setImporterName(e.target.value)}
                    />
                    <label>Address: </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label>Contact Number: </label>
                    <input
                        type="number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Update</button>
                    {error && <div className="error">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
        </ExportsNavBar>
        </div>
        </div>
    );
};

export default UpdateImporter;
