import React, { useState, useEffect } from 'react';
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
    const monthlyReport = {};

    // Loop through orders to populate report data for the selected month
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (selectedMonth && month !== selectedMonth) {
        return; //if not the selected month
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

    // Convert report data into an array
    const reportArray = [];

    for (const month in monthlyReport) {
      const { ordersCount, items } = monthlyReport[month];
      let isFirstRow = true;

      for (const code in items) {
        const { name, unitPrice, quantity, totalCost } = items[code];
        reportArray.push({
          month: isFirstRow ? month : '', 
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

    const pdf = new jsPDF();
    
    //header
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Monthly Order Report", 14, 10);
    
    //watermark
    pdf.setFontSize(30);
    pdf.setTextColor(128, 128, 128);
    pdf.text("ElectriGen by Divolca", pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height / 2, null, null, 'center');
    
    //footer
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.width - 30, pdf.internal.pageSize.height - 10);
    }

    if (selectedMonth) {
        pdf.text(20, 20, `Monthly Order Report - ${selectedMonth}`);
    } else {
        pdf.text(20, 20, `Monthly Order Report - All Months`);
    }
    pdf.text(20, 30, `Generated on: ${new Date().toLocaleString()}`);

    //table
    pdf.autoTable({
        startY: 40,
        head: [['Month', 'Orders Count', 'Item Code', 'Item Name', 'Unit Price(lkr)', 'Quantity', 'Total Earning(lkr)']],
        body: reportData.map(row => [row.month, row.ordersCount, row.code, row.name, row.unitPrice, row.quantity, row.totalCost]),
        theme: 'grid',
        styles: { overflow: 'linebreak' },
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
  {reportData.map((row, index) => {
    if (index === 0 || reportData[index - 1].month !== row.month) {
      return <option key={index} value={row.month}>{row.month}</option>;
    }
    return null;
  })}
</select>
      </div>
      <table className="report-table">
        <thead>
          <tr className="report-header-row">
            <th>Month</th>
            <th>Orders Count</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Unit Price(lkr)</th>
            <th>Quantity</th>
            <th>Total Earning(lkr)</th>
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
