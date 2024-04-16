import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NavbarNishadi from '../components/SupplierOrderNavbar';
import { format, getMonth } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import SupplierOrderDetails from "../components/SupplierOrderDetails";

const SupplierOrderReportPage = () => {
  const location = useLocation();
  const orders = location?.state?.orders || [];
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showReportButton, setShowReportButton] = useState(false);

  useEffect(() => {
    if (!showReportButton && selectedMonth !== '') {
      setShowReportButton(true);
    }
  }, [showReportButton, selectedMonth]);

  const handleGenerateReport = () => {
    const input = document.getElementById('report-content');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        // Add border to the entire page
        pdf.setLineWidth(2);
        pdf.rect(0, 0, pdfWidth, pdfHeight);

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Add border to the table
        const tableOptions = {
          startY: pdfHeight + 20,
          theme: 'grid',
          styles: { halign: 'center' },
          columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 60 }, 2: { cellWidth: 90 }, 3: { cellWidth: 90 }, 4: { cellWidth: 90 }, 5: { cellWidth: 60 }, 6: { cellWidth: 90 } },
        };
        pdf.autoTable(['Order ID', 'Supplier ID', 'Ordered Date', 'Receipt Date', 'Order Status', 'Supplier Rating', 'Items'], filteredOrders.map(order => {
          return [
            order.Sup_Ord_id,
            order.Sup_ID,
            format(new Date(order.Sup_orded_date), 'yyyy-MM-dd'),
            format(new Date(order.Sup_recpt_date), 'yyyy-MM-dd'),
            order.Sup_Ord_sts,
            order.Sup_rating,
            order.items.map(item => `${item.Sup_Quant} ${item.Sup_Cost} ${item.Sup_matrial_code}`).join('\n')
          ];
        }), tableOptions);

        pdf.save('supplier_order_report.pdf');
      });
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  const filteredOrders = selectedMonth
    ? orders.filter(order => getMonth(new Date(order.Sup_orded_date)) === parseInt(selectedMonth))
    : orders;

  return (
    <NavbarNishadi>
      <div>
        <h1>Supplier Order Report</h1>
        <br/>
        <div className="dropdown">
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>
        <br/><br/>
        {showReportButton && (
          <button className="button" onClick={handleGenerateReport}>Generate Report</button>
        )}
        <br/><br/><br/>
        <div id="report-content">

          <h3 style={{ color: 'darkblue' }}>Monthly Report Based on the Ordered Date</h3>
          <br/>
          <br/>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <SupplierOrderDetails key={order.Sup_Ord_id} order={order} hideActions hideCreatedAt />
            ))
          ) : (
            <p>No orders to display</p>
          )}
        </div>
      </div>
    </NavbarNishadi>
  );
};

export default SupplierOrderReportPage;
