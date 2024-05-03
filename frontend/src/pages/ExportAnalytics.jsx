import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import "../exports.css";

const ExportAnalytics = () => {
  const [exports, setExports] = useState([]);
  const [filteredExports, setFilteredExports] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/export');
      setExports(response.data);
    } catch (error) {
      console.error('Error fetching export orders:', error);
    }
  };

  useEffect(() => {
    if (selectedMonth !== '') {
      const filtered = exports.filter(exportt => {
        const orderDate = new Date(exportt.createdAt);
        return orderDate.getMonth() === parseInt(selectedMonth);
      });
      setFilteredExports(filtered);
    } else {
      setFilteredExports(exports);
    }
  }, [selectedMonth, exports]);

  // Function to count orders for each day of the selected month
  const countOrdersByDay = () => {
    const counts = Array(31).fill(0); // Assuming a maximum of 31 days in a month
    filteredExports.forEach(exportt => {
      const orderDate = new Date(exportt.createdAt);
      const dayOfMonth = orderDate.getDate();
      counts[dayOfMonth - 1]++; // Subtract 1 because JavaScript Date object's getDay() returns 1-based index
    });
    return counts;
  };

  const data = countOrdersByDay().map((count, index) => ({
    day: index + 1, // Adding 1 to index to make it 1-based
    exports: count,
  }));

  return (
    <ExportsNavBar>
      <div>
        <Typography variant="h3" component="h2" gutterBottom>
          Export Order Report
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
                <MenuItem key={index} value={index}>{getMonthName(index)}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {selectedMonth !== '' && (
          <>
            <Card variant="outlined" style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Orders Count for Selected Month
                </Typography>
                <Divider />
                <BarChart width={600} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="exports" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
            <Card variant="outlined" style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Order Details for {getMonthName(selectedMonth)}
                </Typography>
                <Divider />
                <table className="export-table">
                  <thead>
                    <tr>
                      <th>Export Order ID</th>
                      <th>Importer ID</th>
                      <th>Ordered Date</th>
                      <th>Order Status</th>
                      <th>Total Cost</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExports.map(exportt => (
                      <tr key={exportt._id}>
                        <td>{exportt.exportOrderID}</td>
                        <td>{exportt.importer}</td>
                        <td>{new Date(exportt.createdAt).toLocaleDateString()}</td>
                        <td>{exportt.status}</td>
                        <td>{exportt.totalCost}</td>
                        <td>
                          <ul>
                            {exportt.items.map((item, index) => (
                              <li key={index}>
                                Item ID: {item.itemID}, Quantity: {item.quantity}, Unit Price: {item.unitPrice}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ExportsNavBar>
  );
};

const getMonthName = (monthIndex) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
};

export default ExportAnalytics;
