import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table, Button, Dropdown } from 'react-bootstrap';
import SalesNavbar from '../components/SalesNavbar';
import "../sales.css";

const InvoiceReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthFilter, setMonthFilter] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sales/display');
      setData(response.data);
      setFilteredData(response.data); // Initially set filtered data to all records
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const monthName = monthFilter ? getMonthName(monthFilter) : ''; // Get the month name if filter is applied
  
    // Add the heading to the PDF
    doc.text(`Showroom Sales Report for ${monthName}`, 10, 10);
    doc.text('', 15, 25); // Empty line for spacing
  
    // Generate the table
    doc.autoTable({
      head: [['Bill ID', 'Date', 'Item No.', 'Description', 'Quantity', 'Unit Price', 'Amount']],
      body: filteredData.flatMap(item =>
        item.items.map((subItem, index) => [
          index === 0 ? item.billID : '', // Show billID only for the first item in each group
          index === 0 ? formatDate(item.bdate) : '', // Show bdate only for the first item in each group
          subItem.ino,
          subItem.desc,
          subItem.qty,
          subItem.price,
          subItem.iamount
        ])
      ),
      foot: [['Total', '', '', '', totalItems, '', totalAmount]], // Add total items and total amount to the footer
      styles: {
        lineColor: [100, 100, 100],
        lineWidth: 0.5,
        cellPadding: 5,
        cellBorder: 'bottom',
      },
      didDrawCell: (data) => {
        // Adjust cell height for merged rows
        if (data.row.raw[0] === '' || data.row.raw[1] === '') {
          data.cell.height = 0;
        }
      },
    });
    doc.save('SalesReport.pdf');
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const filterByMonth = (month) => {
    setMonthFilter(month);
    let filtered;
    if (month === null) {
      // Reset filter to display all records
      filtered = data;
    } else {
      filtered = data.filter(item =>
        new Date(item.bdate).getMonth() === month - 1 // Month is zero-based in JavaScript Date objects
      );
    }
    setFilteredData(filtered);
    updateTotals(filtered); // Update totals after filtering
  };

  const updateTotals = (filteredData) => {
    let totalItemsCount = 0;
    let totalAmountCount = 0;

    filteredData.forEach(item => {
      item.items.forEach(subItem => {
        totalItemsCount += subItem.qty;
        totalAmountCount += subItem.iamount;
      });
    });

    setTotalItems(totalItemsCount);
    setTotalAmount(totalAmountCount);
  };

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1]; // Month is zero-based in JavaScript Date objects
  };

  return (
    <SalesNavbar>
    <div>
      <div className='sales-header'>
      <h1>Report Generator</h1>
      </div>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="info" id="dropdown-month">
          {monthFilter ? `Filter by Month: ${monthFilter}` : 'Select Month'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => filterByMonth(null)}>All Months</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(1)}>January</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(2)}>February</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(3)}>March</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(4)}>April</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(5)}>May</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(6)}>June</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(7)}>July</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(8)}>August</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(9)}>September</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(10)}>October</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(11)}>November</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByMonth(12)}>December</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="success" className="mb-3" onClick={handleDownloadPDF}>Download PDF</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Date</th>
            <th>Item No.</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            item.items.map((subItem, index) => (
              <tr key={`${item.billID}-${index}`} className={index === 0 ? 'border-bottom' : ''}>
                {index === 0 ? <td rowSpan={item.items.length}>{item.billID}</td> : null}
                {index === 0 ? <td rowSpan={item.items.length}>{formatDate(item.bdate)}</td> : null} {/* Show date only for the first item */}
                <td>{subItem.ino}</td>
                <td>{subItem.desc}</td>
                <td>{subItem.qty}</td>
                <td>{subItem.price}</td>
                <td>{subItem.iamount}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
      <div className="mt-3">
        <label>Total Number of Sold Items:</label>
        <input type="text" value={totalItems} readOnly />
      </div>
      <div>
        <label>Total Amount Earned:</label>
        <input type="text" value={totalAmount} readOnly />
      </div>
    </div>
    </SalesNavbar>
  );
};

export default InvoiceReport;
