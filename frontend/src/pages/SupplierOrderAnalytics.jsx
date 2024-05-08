import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import NavbarNishadi from '../components/SupplierOrderNavbar'
import '../SupplierOrder.css';

const AnalyticsN = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/supplier_order');
      setOrders(response.data);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching supplier orders:', error);
    }
  };

  useEffect(() => {
    if (selectedMonth !== '') {
      const filtered = orders.filter(order => {
        const orderDate = new Date(order.Sup_orded_date);
        return orderDate.getMonth() === parseInt(selectedMonth);
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [selectedMonth, orders]);

  // Function to count orders for each day of the selected month
  const countOrdersByDay = () => {
    const counts = Array(31).fill(0); // Assuming a maximum of 31 days in a month
    filteredOrders.forEach(order => {
      const orderDate = new Date(order.Sup_orded_date);
      const dayOfMonth = orderDate.getDate();
      counts[dayOfMonth - 1]++; // Subtract 1 because JavaScript Date object's getDay() returns 1-based index
    });
    return counts;
  };

  const data = countOrdersByDay().map((count, index) => ({
    day: index + 1, // Adding 1 to index to make it 1-based
    orders: count,
  }));

  return (
    <div className="dashboard-container">
    <NavbarNishadi>
      <div>
        <Typography variant="h3" component="h2" gutterBottom>
          Supplier Order Analytics
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
        {isLoading ? ( // Show loading message while fetching data
          <Typography>Loading...</Typography>
        ) : selectedMonth !== '' ? (
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
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
            <Card variant="outlined" style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Order Details for {getMonthName(selectedMonth)}
                </Typography>
                <Divider />
                <table className='order-details-table'>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Supplier ID</th>
                      <th>Ordered Date</th>
                      <th>Receipt Date</th>
                      <th>Order Status</th>
                      <th>Rating</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order._id}>
                        <td>{order.Sup_Ord_id}</td>
                        <td>{order.Sup_ID}</td>
                        <td>{order.Sup_orded_date}</td>
                        <td>{order.Sup_recpt_date}</td>
                        <td>{order.Sup_Ord_sts}</td>
                        <td>{order.Sup_rating}</td>
                        <td>
                          {order.items.map((item, index) => (
                            <div key={index}>{`Item${index + 1}: ${item.Sup_matrial_code} - ${item.M_Name} (${item.Sup_Quant})`}</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        ) : (
          <Typography>Please select a month to view analytics.</Typography>
        )}
      </div>
    </NavbarNishadi>
   </div>
  );
};

const getMonthName = (monthIndex) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
};

export default AnalyticsN;
