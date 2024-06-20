import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DonationNavbar from '../components/DonationNavbar';
import "../donation.css";
import Swal from 'sweetalert2'; // Import SweetAlert

function DProjectEdit() {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({
        project_id: '',
        estimate_date: '',
        description: '',
        total_amount: 0,
        items: [],
    });
    const [oldQuantities, setOldQuantities] = useState({}); // Store old quantities

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await axios.get(`http://localhost:4000/DonationProject/get/${projectId}`);
                // Assuming the backend returns the project data directly
                const formattedProjectData = {
                    ...response.data,
                    // Format the date received from the backend
                    estimate_date: response.data.estimate_date.split('T')[0] // Extracting yyyy-MM-dd from "2024-04-22T00:00:00.000Z"
                };
                setProjectData(formattedProjectData);

                // Store initial item quantities in oldQuantities
                const initialQuantities = {};
                for (const item of formattedProjectData.items) {
                    initialQuantities[item.item] = item.qty;
                    console.log("existing qyt", initialQuantities[item.item]);
                }
                setOldQuantities(initialQuantities);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        }
        
        fetchProject();
    }, [projectId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (index, field, value) => {
        // Check if the entered quantity is negative
        if (field === 'qty' && parseInt(value) < 0) {
            // If the quantity is negative, set it to 0
            value = 0;
        }
    
        const updatedItems = [...projectData.items];
        updatedItems[index][field] = value;
        setProjectData(prevData => ({
            ...prevData,
            items: updatedItems,
            total_amount: calculateTotalAmount(updatedItems),
        }));
    };
    

    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => {
            return total + item.qty * item.unitPrice;
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Iterate through updated items to update product quantities
            for (const item of projectData.items) {
                try {
                    // Fetch product associated with the item code
                    const productResponse = await fetch(`http://localhost:4000/api/products/itemCode/${item.item}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (productResponse.ok) {
                        const productData = await productResponse.json();
    
                        // Fetch old quantity for the item
                        const oldQuantity = oldQuantities[item.item];
                        if (oldQuantity !== undefined) {
                            // Calculate quantity difference
                            const quantityDifference = item.qty - oldQuantity;
                            console.log("difference",quantityDifference);
    
                            // Calculate new quantity for the product
                            let newQuantity;
                            if (quantityDifference > 0) {
                                newQuantity = productData.quantity - quantityDifference; // Subtract quantity difference
                            } else {
                                newQuantity = productData.quantity + Math.abs(quantityDifference); // Add absolute value of quantity difference
                            }
                            console.log("new qty", newQuantity);
    
                            // Update product quantity in the database
                            const updateProductResponse = await fetch(`http://localhost:4000/api/products/${productData._id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ quantity: newQuantity }),

                            });
    
                            if (!updateProductResponse.ok) {
                                throw new Error("Failed to update product quantity");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error updating product:", error);
                    // Handle error updating product quantity
                }
            }
    
            // Update the project in the database
            await fetch(`http://localhost:4000/DonationProject/update/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });
            
            // Display SweetAlert message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Project updated successfully!",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Redirect to DProjectDetails.jsx page
                window.location.replace('/DProjectDetails');
            });
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error updating project. Please try again.');
        }
    };
    

    const handleAddItem = () => {
        setProjectData(prevData => ({
            ...prevData,
            items: [...prevData.items, { item: '', qty: 0, unitPrice: 0 }]
        }));
    };

    return (
        <DonationNavbar>
            <div>
                <h1 className="don-header">Edit Project</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="projectID">Project ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectID"
                            name="project_id"
                            value={projectData.project_id}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={projectData.description}
                            onChange={handleInputChange}
                            readOnly
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="estimateDate">Estimate Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="estimateDate"
                            name="estimate_date"
                            value={projectData.estimate_date}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </div>
                    {/* Render input fields for each item */}
                    {projectData.items.map((item, index) => (
                        <div key={index}>
                            <label>Item {index + 1}</label>
                            <input
                                type="text"
                                value={item.item}
                                onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                                readOnly
                            />
                            <label>Item Quantity {index + 1}</label>
                            <input
                                type="number"
                                value={item.qty}
                                onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                            />
                            <label>Unit Price {index + 1}</label>
                            <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                            />
                        </div>
                    ))}
                    {/* Display total amount */}
                    <div className="form-group">
                        <label>Total Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            value={projectData.total_amount}
                            readOnly
                        />
                    </div>
                    {/* Button to add a new item */}
                    <button type="submit" className="btn btn-primary">Update Project</button>
                </form>
            </div>
        </DonationNavbar>
    );
}

export default DProjectEdit;
