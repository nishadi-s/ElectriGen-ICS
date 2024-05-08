import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import SalesNavbar from '../components/SalesNavbar'; // Assuming you have a SalesNavbar component
import '../sales.css';

const SalesAna = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [selectedMonth, setSelectedMonth] = useState(''); // State to track selected month
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch data from API when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sales/display');
      setData(response.data);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter data based on selected month
  useEffect(() => {
    if (selectedMonth !== '') {
      const filtered = data.filter(item => {
        const itemDate = new Date(item.bdate);
        return itemDate.getMonth() + 1 === parseInt(selectedMonth); // Month is 0-based in Date object
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Show all data if no month is selected
    }
  }, [selectedMonth, data]);

  // Function to count items for each day of the selected month
  const countItemsByDay = () => {
    const counts = Array(31).fill(0); // Assuming a maximum of 31 days in a month
    filteredData.forEach(item => {
      const itemDate = new Date(item.bdate);
      const dayOfMonth = itemDate.getDate();
      counts[dayOfMonth - 1]++; // Subtract 1 because JavaScript Date object's getDate() returns 1-based index
    });
    return counts;
  };

  // Prepare data for the bar chart
  const chartData = countItemsByDay().map((count, index) => ({
    day: index + 1, // Adding 1 to index to make it 1-based
    items: count,
  }));

  return (
    <SalesNavbar>
      <div>
        <Typography variant="h3" component="h2" gutterBottom>
          Sales Analytics
        </Typography>
        <div className="action-buttons">
          <div style={{ marginLeft: '20px' }}>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              displayEmpty
              style={{ width: '200px' }} // Adjust width as needed
            >
              <MenuItem value="" disabled>
                Please select a month
              </MenuItem>
              {[...Array(12).keys()].map((index) => (
                <MenuItem key={index} value={index + 1}>{getMonthName(index)}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {isLoading ? ( // Show loading message while fetching data
          <Typography>Loading...</Typography>
        ) : selectedMonth !== '' ? (
          <>
            <Card variant="outlined" style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Items Sold per Day for Selected Month
                </Typography>
                <Divider />
                <BarChart width={600} height={300} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="items" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </>
        ) : (
          <Typography>Please select a month to view analytics.</Typography>
        )}
      </div>
    </SalesNavbar>
  );
};

// Utility function to get month name
const getMonthName = (monthIndex) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
};

export default SalesAna;
