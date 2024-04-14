import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const UpdateSalaryPage = () => {
  const { id } = useParams(); // Get the salary ID from the URL
  const [salary, setSalary] = useState(() => {
    const savedSalary = JSON.parse(localStorage.getItem('updatedSalary')) || {
      fname: '',
      lname: '',
      email: '',
      role: '',
      base: '',
      otRate: '',
      otHours: '',
      bonus: '',
      reason: '',
      finalSal: ''
    };
    return savedSalary;
  });

  useEffect(() => {
    // Fetch the current salary details based on the ID
    const fetchSalary = async () => {
      try {
        const response = await axios.get(`/api/salaries/${id}`); // Adjust the URL as per your API endpoint
        if (response.status === 200) {
          setSalary(response.data);
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
    try {
      const response = await axios.put(`/api/salaries/update/${id}`, salary); // Adjust the URL as per your API endpoint
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Salary details have been updated!',
          background: '#fff',
          showConfirmButton: true,
          confirmButtonText: 'Okay',
          confirmButtonColor: '#0712e0',
          iconColor: '#60e004',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in updating salary details!',
          background: '#fff',
          showConfirmButton: true,
          confirmButtonText: 'Okay',
          confirmButtonColor: '#f2220f',
          iconColor: '#60e004',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in updating salary details!',
        background: '#fff',
        showConfirmButton: true,
        confirmButtonText: 'Okay',
        confirmButtonColor: '#f2220f',
        iconColor: '#60e004',
      });
    }
  };

  // Handle input change and update local storage
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalary(prevState => {
      const updatedSalary = {
        ...prevState,
        [name]: value
      };
      localStorage.setItem('updatedSalary', JSON.stringify(updatedSalary));
      return updatedSalary;
    });
  };

  return (
    <div>
      <h2>Update Salary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" value={salary.fname} onChange={handleChange} />
        </div>
        {/* Add other input fields similarly */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSalaryPage;

