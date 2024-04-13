import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateSalaryPage = () => {
  const { id } = useParams(); // Get the salary ID from the URL
  const [salary, setSalary] = useState(null);

  // Fetch the current salary details based on the ID
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await fetch(`/api/salaries/${id}`); 
        alert(id)// Adjust the URL as per your API endpoint
        if (response.ok) {
          const data = await response.json();
          setSalary(data);
        } else {
          console.error('Failed to fetch salary details');
        }
      } catch (error) {
        console.error('Error fetching salary details:', error);
      }
    };

    fetchSalary();
  }, [id]);

  // Handle form submission for updating salary details
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert()
    // Implement your logic for updating salary details
  };

  // Render a form to edit salary details
  return (
    <div>
      <h2>Update Salary</h2>
      {salary && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fname">First Name:</label>
            <input type="text" id="fname" name="fname" value={salary.fname} />
          </div>
          <div>
            <label htmlFor="lname">Last Name:</label>
            <input type="text" id="lname" name="lname" value={salary.lname} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={salary.email} />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" name="role" value={salary.role} />
          </div>
          <div>
            <label htmlFor="base">Base Salary:</label>
            <input type="number" id="base" name="base" value={salary.base} />
          </div>
          <div>
            <label htmlFor="otRate">Overtime Rate:</label>
            <input type="number" id="otRate" name="otRate" value={salary.otRate} />
          </div>
          <div>
            <label htmlFor="otHours">Overtime Hours:</label>
            <input type="number" id="otHours" name="otHours" value={salary.otHours} />
          </div>
          <div>
            <label htmlFor="bonus">Bonus:</label>
            <input type="number" id="bonus" name="bonus" value={salary.bonus} />
          </div>
          <div>
            <label htmlFor="reason">Reason:</label>
            <textarea id="reason" name="reason" value={salary.reason}></textarea>
          </div>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default UpdateSalaryPage;
