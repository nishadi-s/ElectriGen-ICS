import React, { useState, useEffect } from "react";
import axios from "axios";

const Donation_Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch projects data
    axios.get("http://localhost:4000/DonationProject/")
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
    <div className="container">
      <div>
        
      <h1>Donation Projects</h1>
       
        <button type="button" className="btn btn-dark">
          <a href="/New_Projects">Add New Project</a>
        </button>


        <button type="button" className="btn btn-dark">
        <a href="/DProjectDetails">View Projects</a>
        </button>

      </div>

      <div>
        <h1>Donation Feedback</h1>
        

        <button type="button" className="btn btn-dark">
          <a href="/Doner_Feedback">Add New Feedback</a>
        </button>

        <button type="button" className="btn btn-dark">
        <a href="/dFeedbackFetch">View Feedback</a>
        </button>

      </div>
    </div>
  );
};

export default Donation_Dashboard;
