import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import axios from 'axios';
import NavbarNishadi from '../components/SupplierOrderNavbar';
import '../SupplierOrder.css';
import { FaUserFriends, FaBox, FaClipboardList } from 'react-icons/fa'; // Importing icons

const SupplierOrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSuppliers, setTotalSuppliers] = useState(0); // State to store the total number of suppliers

  useEffect(() => {
    fetchOrders();
    fetchTotalSuppliers(); // Fetch total suppliers when component mounts
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/supplier_order');
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching supplier orders:', error);
    }
  };

  const fetchTotalSuppliers = async () => {
    try {
      const response = await axios.get('/api/supplier'); // Assuming the endpoint to fetch suppliers is '/api/suppliers'
      setTotalSuppliers(response.data.length); // Set total suppliers count
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  // calculate total orders for each month
  const getTotalOrdersByMonth = () => {
    const totalOrdersByMonth = Array(12).fill(0); // Assuming 12 months
    orders.forEach(order => {
      const orderDate = new Date(order.Sup_orded_date);
      const month = orderDate.getMonth();
      totalOrdersByMonth[month]++;
    });
    return totalOrdersByMonth;
  };

  const totalOrdersByMonth = getTotalOrdersByMonth();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Define an array of blue colors for the grids
  const gridColors = ['#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B', '#64B5F6', '#42A5F5', '#2196F3'];

  // Filter out months without orders
  const monthsWithOrders = totalOrdersByMonth.map((count, index) => ({ month: months[index], count })).filter(item => item.count > 0);

  // Calculate total orders for the year
  const totalOrdersForYear = orders.length;

  return (
    <NavbarNishadi>
      <div>
        <h1> DASHBOARD</h1>

        {isLoading ? (
          <Typography color="textPrimary">Loading...</Typography>
        ) : (
          <div>
            {/* Display total orders for the year  */}
            <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: gridColors[gridColors.length - 1] }}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" color="textPrimary" gutterBottom>
                  <FaClipboardList style={{ color: '#333', fontSize: '32px', marginRight: '10px' }} /> Total Orders for the Year
                </Typography>
                <Divider />
                <Typography color="textPrimary">
                  {totalOrdersForYear}
                </Typography>
              </CardContent>
            </Card>
            {/* Display total suppliers  */}
            <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: gridColors[gridColors.length - 1] }}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" color="textPrimary" gutterBottom>
                  <FaUserFriends style={{ color: '#333', fontSize: '32px', marginRight: '10px' }} /> Total Suppliers
                </Typography>
                <Divider />
                <Typography color="textPrimary">
                  {totalSuppliers}
                </Typography>
              </CardContent>
            </Card>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {monthsWithOrders.map(({ month, count }, index) => (
                <Card key={index} variant="outlined" style={{ margin: '10px', flex: '1 1 300px', backgroundColor: gridColors[index % gridColors.length] }}>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                      {month}
                    </Typography>
                    <Divider />
                    <Typography color="textPrimary">
                      <FaBox style={{ color: '#666', fontSize: '28px', marginRight: '10px' }} /> Total Orders: {count}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </NavbarNishadi>
  );
};

export default SupplierOrderDashboard;
