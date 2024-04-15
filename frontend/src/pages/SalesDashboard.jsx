import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import SalesNavbar from '../components/SalesNavbar';

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchData();
    setGreetingMessage();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sales/display'); // Update the API endpoint accordingly
      setSalesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting('Good Morning! Have a nice day!');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon! Have a nice day!');
    } else {
      setGreeting('Good Evening! Have a nice day!');
    }
  };

  return (
    <SalesNavbar>
    <div>
      <h1>Showroom Sales Dashboard</h1>

      <div class="mt-5 mb-5">
        <div class="card">
            <div class="card-header">
                Welcome to the Showroom Sales Management of ElectriGen.
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <h2>{greeting}</h2>
                </blockquote>
            </div>
        </div>
      </div>


      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <h4>Summarized Past sales records</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{sale.billID}</td>
                <td>{new Date(sale.bdate).toLocaleDateString()}</td>
                <td>{sale.tot}</td>
                <td>{sale.totqty}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    </SalesNavbar>
  );
};

export default SalesDashboard;
