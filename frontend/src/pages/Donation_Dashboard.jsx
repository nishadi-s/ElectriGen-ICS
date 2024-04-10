import React, { useState, useEffect } from "react";
import axios from "axios";

const Donation_Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch projects data
    axios.get("http://localhost:4000/projects")
      .then(response => {
        setProjects(response.data); // Assuming response.data contains project data
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
      });

    // Fetch donation feedback data
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:4000/dFeedback/getAllf");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback data");
        }
        const json = await response.json();
        setFeedback(json);
      } catch (error) {
        console.error("Error fetching donation feedback:", error);
      }
    };

    fetchFeedback(); // Execute the fetchFeedback function

  }, []);

  return (
    <div>
      <h1>Past Projects</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="btn btn-dark">
        <a href="/New_Projects">Add New Project</a>
      </button>

      <div>
    <h1>Donation Feedback</h1>
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
        {feedback.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.message}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <button type="button" className="btn btn-dark">
      <a href="/Doner_Feedback">Add New Feedback</a>
    </button>
  </div>
</div>
  
  );
};

export default Donation_Dashboard;
