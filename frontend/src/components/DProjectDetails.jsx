import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DProjectDetails() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedItems, setEditedItems] = useState([]); // State to hold edited items details
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await axios.get("http://localhost:4000/DonationProject/");
                // Filter out duplicate items
                const uniqueProjects = response.data.map(project => ({
                    ...project,
                    items: project.items.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.item === item.item
                        ))
                    )
                }));
                setProjects(uniqueProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        
        fetchProjects();
    }, []);

    const handleEdit = (project) => {
        navigate('/dProjectUpdate');
    };

    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`http://localhost:4000/DonationProject/delete/${projectId}`);
            setProjects(prevProjects => prevProjects.filter(project => project.project_id !== projectId));
            console.log("Project deleted successfully:", projectId);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleEditItem = (project) => {
        setEditedItems(project.items); // Set the edited items details
        // You can navigate to the edit item page if needed
    };

    const handleUpdateItem = async () => {
        try {
            // Construct the updated projects array with updated items
            const updatedProjects = projects.map(project => {
                if (project.items === editedItems) {
                    return {
                        ...project,
                        items: editedItems
                    };
                }
                return project;
            });

            // Recalculate total amount for each project
            updatedProjects.forEach(project => {
                let totalAmount = 0;
                project.items.forEach(item => {
                    totalAmount += item.qty * item.unitPrice;
                });
                project.total_amount = totalAmount;
            });

            // Send PUT requests to update each project with the updated items
            await Promise.all(updatedProjects.map(async (updatedProject) => {
                await axios.put(`http://localhost:4000/DonationProject/update/${updatedProject.project_id}`, updatedProject);
            }));

            // Fetch all items after updating
            const response = await axios.get("http://localhost:4000/DonationProject/");
            setProjects(response.data);
            setEditedItems([]); // Reset edited items state
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const handleSearchInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = projects.filter(project => {
            const projectIdString = String(project.project_id);
            return projectIdString.toLowerCase().includes(query);
        });
        setProjects(filtered);

        if (query === '') {
            window.scrollTo(0, 0);
        }
    };

    return (
        <div>
            <h1>Projects Details</h1>
            <input
                type="text"
                placeholder="Search Project ID"
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Description</th>
                        <th>Estimate Date</th>
                        <th>Total Amount</th>
                        <th>Items</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.project_id}</td>
                            <td>{project.description}</td>
                            <td>{project.estimate_date}</td>
                            <td>{project.total_amount}</td>
                            <td>
                                <ul>
                                    {project.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.item} - Qty: {item.qty}, Unit Price: {item.unitPrice}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                
                                <button onClick={() => handleDelete(project.project_id)}>Delete</button>
                                <button onClick={() => handleEditItem(project)}>Edit Item</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editedItems.length > 0 && (
                <div>
                    <h2>Edit Items</h2>
                    {editedItems.map((editedItem, index) => (
                        <div key={index}>
                            <h3> Item {index + 1}</h3>
                            <input
                                type="text"
                                value={editedItem.item}
                                onChange={(e) => {
                                    const newItems = [...editedItems];
                                    newItems[index].item = e.target.value;
                                    setEditedItems(newItems);
                                }}
                            />
                            <input
                                type="number"
                                value={editedItem.qty}
                                onChange={(e) => {
                                    const newItems = [...editedItems];
                                    newItems[index].qty = e.target.value;
                                    setEditedItems(newItems);
                                }}
                            />
                            <input
                                type="number"
                                value={editedItem.unitPrice}
                                onChange={(e) => {
                                    const newItems = [...editedItems];
                                    newItems[index].unitPrice = e.target.value;
                                    setEditedItems(newItems);
                                }}
                            />
                        </div>
                    ))}
                    <button onClick={handleUpdateItem}>Update Items</button>
                </div>
            )}
        </div>
    );
}

export default DProjectDetails;
