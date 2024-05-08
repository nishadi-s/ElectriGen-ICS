import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';

const DisMGraphs = () => {
  const { orders } = useOrdersContext();
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (orders) {
      generateReportData();
    }
  }, [orders]);

  const generateReportData = () => {
    const monthlyReport = {};

    // Loop through orders to populate report data for each month
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyReport[month]) {
        monthlyReport[month] = {
          ordersCount: 0,
          totalCost: 0
        };
      }

      monthlyReport[month].ordersCount++;
      order.items.forEach(item => {
        monthlyReport[month].totalCost += item.unit * item.quantity;
      });
    });

    // Convert report data into an array for easier manipulation
    const reportArray = [];

    for (const month in monthlyReport) {
      const { ordersCount, totalCost } = monthlyReport[month];
      reportArray.push({
        month,
        ordersCount,
        totalCost
      });
    }

    setReportData(reportArray);
  };

  return (
    <div>
      <h2>Monthly Order Analysis</h2>
      <div className="analysis-chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ordersCount" fill="#233066" name="Orders Count" />
            <Bar dataKey="totalCost" fill="rgba(35, 48, 102, 0.5)" name="Total Earning(lkr)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="analysis-table">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Orders Count</th>
              <th>Total Earning(lkr)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>{row.ordersCount}</td>
                <td>{row.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisMGraphs;

