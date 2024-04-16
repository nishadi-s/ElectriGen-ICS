import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DonationNavbar from '../components/DonationNavbar';

function DProjectEdit() {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({
        project_id: '',
        estimate_date: '',
        description: '',
        total_amount: 0,
        items: [],
    });

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
            await axios.put(`http://localhost:4000/DonationProject/update/${projectId}`, projectData);
            alert('Project updated successfully!');
            window.location.replace('/DProjectDetails');
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
            <h1>Edit Project</h1>
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
                        />
                        <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        />
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
                <button type="button" className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
                <button type="submit" className="btn btn-primary">Update Project</button>
            </form>
        </div>
        </DonationNavbar>
    );
}

export default DProjectEdit;
