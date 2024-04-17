import React from "react";
import { Card, CardContent, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material'; // Import necessary components from Material-UI
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalaryReport = ({ salary }) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handleDownloadPdf = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define table rows
    const tableRows = [
      ['Full Name', `${salary.fname} ${salary.lname}`],
      ['Role', salary.role],
      ['Base Salary', `$${salary.base}`],
      ['Overtime Rate', `$${salary.otRate}`],
      ['Overtime Hours', salary.otHours],
      ['Bonus', `$${salary.bonus}`],
      ['Reason', salary.reason],
      ['Final Salary', `$${salary.finalSal}`],
    ];

    // Calculate total amount
    const totalAmount = Object.keys(salary).reduce((acc, key) => {
      if (key === 'base' || key === 'otRate' || key === 'bonus' || key === 'finalSal') {
        return acc + parseFloat(salary[key]);
      }
      return acc;
    }, 0);

    // Add header section
    pdf.setFontSize(14);
    pdf.text('Elctrigen Company', 14, 15);
    pdf.setFontSize(10);
    pdf.text('296 Sir Ratnajothi Saravanamuttu Mawatha, Colombo 01300', 14, 25);
    pdf.text('Phone: +94 76 690 2686| Email: electrigen@dev.lk', 14, 35);
    pdf.text('Date: ' + currentDate, 14, 45);

    // Add table to the PDF
    pdf.autoTable({
      body: tableRows,
      startY: 60, // Adjust vertical position of the table
      theme: 'grid', // Apply grid theme to the table
      styles: { cellPadding: 5 },
      headStyles: { fillColor: '#f5f5f5' }, // Set header background color
    });

    // Add footer section
    pdf.setFontSize(12);
    pdf.text(`Total: $${totalAmount.toFixed(2)}`, 14, pdf.internal.pageSize.height - 20);

    // Download the PDF
    pdf.save('salary_report.pdf');
  };

  return (
    <Card variant="outlined" style={{ border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h5" color="primary" gutterBottom style={{ marginBottom: '20px' }}>
          Salary Report
        </Typography>
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              {Object.entries(salary).map(([field, value]) => (
                <TableRow key={field}>
                  <TableCell>{field}</TableCell>
                  <TableCell>{field === 'finalSal' ? `$${value}` : value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell>{currentDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell>{currentTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleDownloadPdf} style={{ marginTop: '20px' }}>
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalaryReport;
