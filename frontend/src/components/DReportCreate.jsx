import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table, Button, Dropdown } from 'react-bootstrap';
import DonationNavbar from '../components/DonationNavbar';

const ProjectReport = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [monthFilter, setMonthFilter] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/DonationProject/');
      setProjects(response.data);
      setFilteredProjects(response.data); // Initially set filtered projects to all records
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  const monthName = monthFilter ? getMonthName(monthFilter) : ''; // Get the month name if filter is applied

  

  const headerText = `Donation Project Report `;


  // Add the heading to the PDF
  doc.text(headerText, 10, 10);
  doc.text('', 15, 25); // Empty line for spacing

  // Generate the table
  doc.autoTable({
    head: [['Project ID', 'Description', 'Estimate Date', 'Total Amount', 'Items']], // Updated header
    body: filteredProjects.map(project => [
      project.project_id,
      project.description,
      formatDate(project.estimate_date),
      project.total_amount,
      // Combine items into a single string
      project.items.map(item => `${item.item} - Qty: ${item.qty}, Unit Price: ${item.unitPrice}`).join('\n')
    ]),
    foot: [['Total', '', '', calculateTotalAmount(), '']], // Add total amount to the footer
    styles: {
      lineColor: [100, 100, 100],
      lineWidth: 0.5,
      cellPadding: 5,
      cellBorder: 'bottom',
    },
    didDrawCell: (data) => {
      // Adjust cell height for merged rows
      if (data.row.raw[0] === '') {
        data.cell.height = 0;
      }
    },
  });
  doc.save('ProjectReport.pdf');
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
      filtered = projects;
    } else {
      filtered = projects.filter(project =>
        new Date(project.estimate_date).getMonth() === month - 1 // Month is zero-based in JavaScript Date objects
      );
    }
    setFilteredProjects(filtered);
  };

  const calculateTotalAmount = () => {
    return filteredProjects.reduce((total, project) => total + project.total_amount, 0);
  };

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1]; // Month is zero-based in JavaScript Date objects
  };

  return (
    <DonationNavbar>
    <div>
      <h1 className="mb-4">Project Report Generator</h1>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="info" id="dropdown-month">
          {monthFilter ? `Filter by Month: ${getMonthName(monthFilter)}` : 'Select Month'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => filterByMonth(null)}>All Months</Dropdown.Item>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <Dropdown.Item key={month} onClick={() => filterByMonth(month)}>
              {getMonthName(month)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="success" className="mb-3" onClick={handleDownloadPDF}>Download PDF</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Description</th>
            <th>Estimate Date</th>
            <th>Total Amount</th>
            <th>Items</th> {/* New column for items */}
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <tr key={project.project_id}>
              <td>{project.project_id}</td>
              <td>{project.description}</td>
              <td>{formatDate(project.estimate_date)}</td>
              <td>{project.total_amount}</td>
              <td>
                {/* Display items */}
                <ul>
                  {project.items.map((item, index) => (
                    <li key={index}>{item.item} - Qty: {item.qty}, Unit Price: {item.unitPrice}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <tfoot>
        <tr>
          <td colSpan="3"></td>
          <td>Total Amount:</td>
          <td>{calculateTotalAmount()}</td>
        </tr>
      </tfoot>
    </div>
    </DonationNavbar>
  );
};

export default ProjectReport;
