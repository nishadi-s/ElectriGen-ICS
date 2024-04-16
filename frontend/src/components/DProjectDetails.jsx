import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DonationNavbar from './DonationNavbar';

function DProjectDetails() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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

    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`http://localhost:4000/DonationProject/delete/${projectId}`);
            setProjects(prevProjects => prevProjects.filter(project => project.project_id !== projectId));
            console.log("Project deleted successfully:", projectId);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleEditItem = (projectId) => {
        // Navigate to DProjectEdit component with the project_id
        navigate(`/dProjectEdit/${projectId}`);
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
        <DonationNavbar>
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
                            <td>{new Date(project.estimate_date).toLocaleDateString()}</td>
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
                                <button onClick={() => handleEditItem(project.project_id)}>Edit Item</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </DonationNavbar>
    );
}

export default DProjectDetails;
