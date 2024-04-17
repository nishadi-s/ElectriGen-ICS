import React from "react";
import { Card, CardContent, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'; // Import necessary components from Material-UI
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalaryReport = ({ salary }) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handleDownloadPdf = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define table columns and rows
    const tableColumns = ['Field', 'Value'];
    const tableRows = [
      ['Full Name', `${salary.fname} ${salary.lname}`],
      ['Role', salary.role],
      ['Base Salary', `$${salary.base}`],
      ['Overtime Rate', salary.otRate],
      ['Overtime Hours', salary.otHours],
      ['Bonus', `$${salary.bonus}`],
      ['Reason', salary.reason],
      ['Final Salary', `$${salary.finalSal}`],
      ['Date', currentDate],
      ['Time', currentTime]
    ];

    // Add table to the PDF
    pdf.autoTable({ head: [tableColumns], body: tableRows });

    // Download the PDF
    pdf.save('salary_report.pdf');
  };

  return (
    <Card variant="outlined" style={{ border: '1px solid #ccc' }}>
      <CardContent>
        <Typography variant="h5" color="primary" gutterBottom>
          Salary Report
        </Typography>
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              {Object.entries(salary).map(([field, value]) => (
                <TableRow key={field}>
                  <TableCell><strong>{field}</strong></TableCell>
                  <TableCell>{field === 'base' || field === 'bonus' || field === 'finalSal' ? `$${value}` : value}</TableCell>
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
