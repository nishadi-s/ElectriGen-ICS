import React from "react";
import { Button, Typography, Grid, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SalaryDetails from './SalaryDetails'; // Import the SalaryDetails component
import { useSalaryContext } from '../hooks/useSalaryContext';

const AllSalariesReport = () => {
  const { salaries } = useSalaryContext();

  const handleDownloadPdf = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Set document properties
    pdf.setProperties({
      title: 'Salaries Report',
      subject: 'Salaries of Employees',
      author: 'Electrigen Company',
      keywords: 'salary, report, employees',
      creator: 'Electrigen Company'
    });
  
    // Add company details
    const companyName = 'Electrigen Company';
    const companyAddress = '296 Sir Ratnajothi Saravanamuttu Mawatha, Colombo 01300';
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
  
    // Define table columns
    const tableColumns = ['Full Name', 'Email', 'Role', 'Base Salary', 'Overtime Rate', 'Overtime Hours', 'Bonus', 'Final Salary'];
  
    // Define table rows by mapping over salary data
    const tableRows = salaries.map(salary => [
      `${salary.fname} ${salary.lname}`,
      salary.email,
      salary.role,
      `$${salary.base}`,
      salary.otRate,
      salary.otHours,
      `$${salary.bonus}`,
      `$${salary.finalSal}`
    ]);
  
    // Add company details to PDF
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(companyName, 15, 20);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(companyAddress, 15, 30);
    pdf.text(`Date: ${currentDate}`, 15, 40);
    pdf.text(`Time: ${currentTime}`, 15, 50);
  
    // Add table to the PDF
    pdf.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 70,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3
      },
      headerStyles: {
        fillColor: '#f5f5f5', // Grey color
        textColor: '#333333' // Black color for text
      }
    });
  
    // Add footer section
    pdf.setFontSize(12);
    pdf.setTextColor(100);
    pdf.text('Thank you for your business!', 15, pdf.internal.pageSize.height - 10);
  
    // Download the PDF
    pdf.save('salaries_report.pdf');
  };
  
  return (
    <div style={{ padding: '20px' }}>
<Typography variant="h5" style={{
      textAlign: 'left',
      width: '100vw',
      padding: '17px 20px',
      backgroundColor: '#233066',
      color: '#fff',
      fontSize: '2.5rem',
      marginBottom: '30px',
      marginTop: '-20px',
      marginLeft: '-20px',
      borderRadius: '0px 10px 0px 10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      Summary Report
    </Typography>      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom style={{ color: '#3f51b5', marginBottom: '10px' }}>Company Details</Typography>
        <Typography variant="body1" gutterBottom>Your Company Name</Typography>
        <Typography variant="body1" gutterBottom>123 Main Street, City, Country</Typography>
        <Typography variant="body1" gutterBottom>Date: {new Date().toLocaleDateString()}</Typography>
        <Typography variant="body1" gutterBottom>Time: {new Date().toLocaleTimeString()}</Typography>
      </Paper>
      {salaries && salaries.length > 0 ? (
        <Table>
          <TableBody>
            {salaries.map(salary => (
              <SalaryDetails key={salary._id} salary={salary} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" gutterBottom>No salary data available.</Typography>
      )}
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleDownloadPdf}>Download PDF</Button>
      </Grid>
    </div>
  );
};

export default AllSalariesReport;