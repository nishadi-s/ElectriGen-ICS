import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import DonationNavbar from "../components/DonationNavbar";

const DonationDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetchData();
    setGreetingMessage();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/DonationProject/"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Good Morning! Have a nice day!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon! Have a nice day!");
    } else {
      setGreeting("Good Evening! Have a nice day!");
    }
  };

  return (
    <DonationNavbar>
      <div>
        <h1>Donation Dashboard</h1>

        <div className="mt-5 mb-5">
          <div className="card">
            <div className="card-header">
              Welcome to the Donation Management of ElectriGen.
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <h2>{greeting}</h2>
              </blockquote>
            </div>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Description</th>
              <th>Estimate Date</th>
              <th>Total Amount</th>
              <th>Items</th>
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
                        {item.item} - Qty: {item.qty}, Unit Price:{" "}
                        {item.unitPrice}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DonationNavbar>
  );
};

export default DonationDashboard;
