import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import Swal from 'sweetalert2';

const UpdateExport = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const navigate = useNavigate();
    const [exportOrderID, setexportOrderID] = useState("");
    const [importer, setimporter] = useState("");
    const [items, setItems] = useState([]);
    const [totalCost, settotalCost] = useState("");
    const [status, setstatus] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [updatedItems, setUpdatedItems] = useState([]); // State to store updated items array

    useEffect(() => {
        // Fetch the order details based on the ID when the component mounts
        const fetchExports = async () => {
            try {
                const response = await fetch(`/api/export/${id}`);
                const exportData = await response.json();
                setexportOrderID(exportData.exportOrderID);
                setimporter(exportData.importer);
                setItems(exportData.items);
                setUpdatedItems([...exportData.items]); // Set updatedItems initially with the same value as items
                settotalCost(exportData.totalCost);
                setstatus(exportData.status);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchExports();
    }, [id]);

    const handleItemChange = (index, field, value) => {
        const updatedItemsCopy = [...updatedItems];
        updatedItemsCopy[index][field] = value;
        setUpdatedItems(updatedItemsCopy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedExport = {
            exportOrderID,
            importer,
            items: updatedItems,
            totalCost,
            status
        };
    
        try {
            const response = await fetch(`/api/export/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedExport),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                const updatedExportData = await response.json();
                setexportOrderID(updatedExportData.exportOrderID);
                setimporter(updatedExportData.importer);
                setItems(updatedExportData.items);
                setUpdatedItems([...updatedExportData.items]); // Set updatedItems with the response data
                settotalCost(updatedExportData.totalCost);
                setstatus(updatedExportData.status);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Export order updated successfully!'
                });
                setTimeout(() => navigate('/ExportsDashboard'), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error, "Error updating export order");
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
                text: 'An error occurred while updating the export order.'
            });
        }
    };
    
    return (
        <ExportsNavBar>
            <div className="update-export">
                <h2>Edit Order</h2>
                <form onSubmit={handleSubmit}>
                    <label>Order ID:</label>
                    <input
                        type="text"
                        value={exportOrderID}
                        disabled
                    />
                    <label>Importer ID: </label>
                    <input
                        type="text"
                        value={importer}
                        onChange={(e) => setimporter(e.target.value)}
                    />
                    {updatedItems.map((item, index) => (
                        <div key={index}>
                            <label>{`Item(${index + 1}) Item ID`}</label>
                            <input
                                type="text"
                                value={item.itemID}
                                onChange={(e) => handleItemChange(index, 'itemID', e.target.value)}
                            />
                            <label>{`Item(${index + 1}) Quantity`}</label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}
                    <label>Total Cost(In Rs.): </label>
                    <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => settotalCost(e.target.value)}
                    />
                    <label>Status: </label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                    />
                    <button type="submit">Update</button>
                    {error && <div className="error">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
        </ExportsNavBar>
    );
};

export default UpdateExport;
