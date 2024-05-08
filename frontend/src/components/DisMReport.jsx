import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

const ReportGeneration = () => {
  const { orders } = useOrdersContext();
  const [reportData, setReportData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    if (orders) {
      generateReportData();
    }
  }, [orders, selectedMonth]);

  const generateReportData = () => {
    // Initialize report data
    const monthlyReport = {};

    // Loop through orders to populate report data for the selected month
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (selectedMonth && month !== selectedMonth) {
        return; // Skip if not the selected month
      }

      if (!monthlyReport[month]) {
        monthlyReport[month] = {
          ordersCount: 0,
          items: {}
        };
      }

      monthlyReport[month].ordersCount++;

      order.items.forEach(item => {
        if (!monthlyReport[month].items[item.code]) {
          monthlyReport[month].items[item.code] = {
            name: item.name,
            unitPrice: item.unit,
            quantity: 0,
            totalCost: 0
          };
        }

        monthlyReport[month].items[item.code].quantity += parseInt(item.quantity);
        monthlyReport[month].items[item.code].totalCost += (item.unit * item.quantity);
      });
    });

    // Convert report data into an array for easier manipulation
    const reportArray = [];

    for (const month in monthlyReport) {
      const { ordersCount, items } = monthlyReport[month];
      let isFirstRow = true; // Flag to track if it's the first row for the month

      for (const code in items) {
        const { name, unitPrice, quantity, totalCost } = items[code];
        reportArray.push({
          month: isFirstRow ? month : '', // Display month only for the first row
          ordersCount: isFirstRow ? ordersCount : '',
          code,
          name,
          unitPrice,
          quantity,
          totalCost
        });

        isFirstRow = false;
      }
    }

    setReportData(reportArray);
  };

  const downloadReport = () => {
    const date = format(new Date(), 'yyyy-MM-dd');
    const filename = `order_report_${selectedMonth || 'all_months'}_${date}.pdf`;

    // Generate PDF
    const pdf = new jsPDF();
    if (selectedMonth) {
      pdf.text(20, 20, `Monthly Order Report - ${selectedMonth}`);
    } else {
      pdf.text(20, 20, `Monthly Order Report - All Months`);
    }
    pdf.text(20, 30, `Generated on: ${new Date().toLocaleString()}`);

    let y = 40;
    reportData.forEach(row => {
      const rowData = Object.values(row).join(', ');
      pdf.text(20, y, rowData);
      y += 10;
    });

    // Save PDF
    pdf.save(filename);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Monthly Order Report</h2>
      <div>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All Months</option>
          {reportData.map((row, index) => (
            <option key={index} value={row.month}>{row.month}</option>
          ))}
        </select>
      </div>
      <table className="report-table">
        <thead>
          <tr className="report-header-row">
            <th>Month</th>
            <th>Orders Count</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((row, index) => (
            <tr key={index} className="report-row">
              <td>{index === 0 || reportData[index - 1].month !== row.month ? row.month : ''}</td>
              <td>{row.ordersCount}</td>
              <td>{row.code}</td>
              <td>{row.name}</td>
              <td>{row.unitPrice}</td>
              <td>{row.quantity}</td>
              <td>{row.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-report" onClick={downloadReport}>Download Report</button>
    </div>
  );
};

export default ReportGeneration;
