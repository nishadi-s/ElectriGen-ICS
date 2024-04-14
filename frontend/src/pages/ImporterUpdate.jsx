import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import Swal from 'sweetalert2';

const UpdateImporter = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const navigate = useNavigate();
    const [importerID,setimporterID]=useState("");
    const [importerName, setimporterName] = useState("");
    const [address, setaddress] = useState("");
    const [contactNumber, setcontactNumber] = useState([]);
    const [email, setemail] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        
        const fetchImporters = async () => {
            try {
                const response = await fetch(`/api/importer/${id}`);
                const importerData = await response.json();
                setimporterID(importerData.importerID);
                setimporterName(importerData.importerName);
                setaddress(importerData.address);
                setcontactNumber(importerData.contactNumber);
                setemail(importerData.email);
                
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchImporters();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    

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
                setimporterName(updatedExportData.importerName);
                setaddress(updatedExportData.address);
                setcontactNumber(updatedExportData.contactNumber);
                setemail(updatedExportData.email);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Importer Details updated successfully!'
                });
                setTimeout(() => navigate('/ImporterDescription'), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error, "Error updating importer details");
                setEmptyFields(errorData.emptyFields['']);
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
        <ExportsNavBar>
            <div className="update-importer">

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
                        onChange={(e) => setimporterName(e.target.value)}
                    />
                    <label>Address: </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                    />
                    <label>Contact Number: </label>
                    <input
                        type="number"
                        value={contactNumber}
                        onChange={(e) => setcontactNumber(e.target.value)}
                    />
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <button type="submit">Update</button>
                    {error && <div className="error">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
        </ExportsNavBar>
    );
};

export default UpdateImporter;
