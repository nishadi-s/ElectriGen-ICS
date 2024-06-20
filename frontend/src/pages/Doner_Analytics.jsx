import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationNavbar from '../components/DonationNavbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../donation.css";

function ProjectTable({ projects }) {
    return (

        <div>
            <h2>Project Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Estimate Date</th>
                        <th>Description</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id}>
                            <td>{project.project_id}</td>
                            <td>{new Date(project.estimate_date).toLocaleDateString()}</td>
                            <td>{project.description}</td>
                            {/* Add more cells for additional columns */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function DProjectDetails() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:4000/DonationProject/");
            setProjects(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        if (selectedMonth !== '') {
            const filtered = projects.filter(project => {
                const projectDate = new Date(project.estimate_date);
                return projectDate.getMonth() === parseInt(selectedMonth);
            });
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects(projects);
        }
    }, [selectedMonth, projects]);

    const countProjectsByDay = () => {
        const counts = Array(31).fill(0);
        filteredProjects.forEach(project => {
            const projectDate = new Date(project.estimate_date);
            const dayOfMonth = projectDate.getDate();
            counts[dayOfMonth - 1]++;
        });
        return counts;
    };

    const data = countProjectsByDay().map((count, index) => ({
        day: index + 1,
        projects: count,
    }));

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const getMonthName = (monthIndex) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    };

    return (
      <DonationNavbar>
        <div className="donation-project-details-container">
        <h1 h1 className="don-header">Donation Project Analytics</h1>
            <div>
                <label>Select Month:</label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">All Months</option>
                    {[...Array(12).keys()].map((monthIndex) => (
                        <option key={monthIndex} value={monthIndex}>{getMonthName(monthIndex)}</option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <BarChart width={600} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="projects" fill="#8884d8" />
                    </BarChart>
                    <ProjectTable projects={filteredProjects} />
                </>
            )}
        </div>
        </DonationNavbar>
    );
}

export default DProjectDetails;
