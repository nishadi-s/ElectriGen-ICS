import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import NavbarNishadi from './SupplierOrderNavbar';

const SupplierOrderReportPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/supplier_order');
      setOrders(response.data);
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

  const handleDownloadPdf = () => {
    const pdf = new jsPDF();
    const title = `${getMonthName(selectedMonth)} Order Report`;
    const tableColumns = ['Order ID', 'Supplier ID', 'Ordered Date', 'Receipt Date', 'Order Status', 'Rating', 'Items'];
    const tableRows = filteredOrders.map(order => [
      order.Sup_Ord_id,
      order.Sup_ID,
      order.Sup_orded_date,
      order.Sup_recpt_date,
      order.Sup_Ord_sts,
      order.Sup_rating,
      order.items.map((item, index) => `Item${index + 1}: ${item.Sup_matrial_code} - ${item.M_Name} (${item.Sup_Quant})`).join('\n')
    ]);

    pdf.text(title, 14, 10);
    pdf.autoTable({ head: [tableColumns], body: tableRows });
    pdf.save('supplier_order_report.pdf');
  };

  const getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  };

  return (
    <NavbarNishadi>
    <div>
      <Typography variant="h3" component="h2" gutterBottom>
        Supplier Order Report
      </Typography>
      <div className="action-buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadPdf}
          disabled={selectedMonth === ''}
          style={{ marginBottom: '20px' }}
        >
          Download PDF
        </Button>
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
      {filteredOrders.length > 0 && (
        <Card variant="outlined" style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Order Details
            </Typography>
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Order ID</strong></TableCell>
                    <TableCell><strong>Supplier ID</strong></TableCell>
                    <TableCell><strong>Ordered Date</strong></TableCell>
                    <TableCell><strong>Receipt Date</strong></TableCell>
                    <TableCell><strong>Order Status</strong></TableCell>
                    <TableCell><strong>Rating</strong></TableCell>
                    <TableCell><strong>Items</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order._id}>
                      <TableCell>{order.Sup_Ord_id}</TableCell>
                      <TableCell>{order.Sup_ID}</TableCell>
                      <TableCell>{order.Sup_orded_date}</TableCell>
                      <TableCell>{order.Sup_recpt_date}</TableCell>
                      <TableCell>{order.Sup_Ord_sts}</TableCell>
                      <TableCell>{order.Sup_rating}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div key={index}>{`Item${index + 1}: ${item.Sup_matrial_code} - ${item.M_Name} (${item.Sup_Quant})`}</div>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </div>
    </NavbarNishadi>
  );
};

export default SupplierOrderReportPage;
