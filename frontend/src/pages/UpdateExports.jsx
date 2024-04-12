import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { findOne } from '../../../Backend/models/exportModel.js';
//import { findOne } from '../../../Backend/models/exportModel.js';
import ExportsNavBar from "../components/ExportsNavBar.jsx";

const UpdateExport = () => {
    const { id } = useParams(); // Get the order ID from the URL params
    const navigate=useNavigate();
    const [exportOrderID,setexportOrderID]=useState("");
    const [importer,setimporter]=useState("");
    const [items,setitems]=useState("");
    const [totalCost,settotalCost]=useState("");
    const [status,setstatus]=useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
  
    
    const [updatedExport, setupdatedExport] = useState({
        exportOrderID: '',
        importer: '',
        items: [],
        totalCost: '',
        status: ''
    });

    useEffect(() => {
        // Fetch the order details based on the ID when the component mounts
        const fetchOrder = async () => {

            try {
                // Check if exportt is null before fetching
                if (!exportt) {
                    return;
                }
            
                const response = await fetch(`/api/export/${exportt._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order');
                }
                const data = await response.json();
                setExport(data);
                setupdatedExport(data); // Set updatedOrder with fetched order data
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();

        // Cleanup function to clear state if component unmounts
        return () => {
            setExport(null);
            setupdatedExport(null);
        };
    }, [id]); // Re-run effect when the ID changes

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setupdatedExport(prevState => ({
            ...prevState,
            items: prevState.items.map((item, idx) => {
                if (idx === index) {
                    return {
                        ...item,
                        [name]: value
                    };
                }
                return item;
            })
        }));
    }
    
    

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/export/${exportt._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExport)
            });

            if (response.ok) {
                // Handle successful update response
                console.log('Order updated successfully');

                // Navigate to Order Success page
                //window.location.href = '/OrderHistory';
            } else {
                // Handle error response
                console.error('Failed to update order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
            // Handle error
        }
    }

    if (!exportt) {
        return <div>Loading...</div>; // Render loading state while fetching order
    }

    return (
        <ExportsNavBar>
        <div className="update-export">
            <h2>Edit Order</h2>
            <form>
            <label>Order ID:</label>
                <input 
                    type="text"
                    name="exportOrderID" 
                    value={updatedExport.exportOrderID} 
                    onChange={handleChange} />

            <label>Importer: </label>
                <input
                    type="text"
                    name="importer"
                    value={updatedExport.importer}
                    onChange={handleChange}
                />

            

            {updatedExport.items.map((item, index) => (
                    <div key={index}>
                        <label>{`Item(${index + 1}) Item ID`}</label>
                        <input
                            type="text"
                            name={`itemID`}
                            value={item.name}
                            onChange={(e) => handleChange(e, index)}
                        />

                        <label>{`Item(${index + 1}) Quantity`}</label>
                        <input
                            type="number"
                            name={`quantity`}
                            value={item.unit}
                            onChange={(e) => handleChange(e, index)}
                        />

                    </div>
                ))}

{/* 
            <label>Item ID: </label>
                <input
                    type="text"
                    name="itemID"
                    value={updatedExport.itemID}
                    onChange={handleChange}
                />

            <label>Quantity: </label>
                <input
                    type="number"
                    name="quantity"
                    value={updatedExport.quantity}
                    onChange={handleChange}
                /> */}

            <label>Total Cost: </label>
                <input
                    type="number"
                    name="totalCost"
                    value={updatedExport.totalCost}
                    onChange={handleChange}
                />

                <label>Status: </label>
                <input
                    type="text"
                    name="status"
                    value={updatedExport.status}
                    onChange={handleChange}
                />

            

                <button className="custom-button" type="submit" onClick={handleUpdate}>Update</button>
            </form>
        </div>
        </ExportsNavBar>
    );
};

export default UpdateExport;