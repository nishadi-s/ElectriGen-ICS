import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import { format } from 'date-fns';

const ReportGeneration = () => {
  const { orders } = useOrdersContext();
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (orders) {
      generateReportData();
    }
  }, [orders]);
  
  const generateReportData = () => {
    // Initialize report data
    const monthlyReport = {};

    // Loop through orders to populate report data
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

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
    const filename = `order_report_${date}.csv`;
    const header = 'Month,Orders Count,Item Code,Item Name,Unit Price,Quantity,Total Cost\n';
    const csv = reportData.reduce((csvString, row) => {
      const values = Object.values(row).join(',');
      return csvString + values + '\n';
    }, header);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
  };

  return (
    <div>
      <h2>Monthly Order Report</h2>
      <table className="report-table">  <thead>
    <tr className="report-header-row">  <th>Month</th>
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
  <button className="btn-report" onClick={downloadReport}>Download Report</button>
</table>
  </div>
  );
};

export default ReportGeneration;