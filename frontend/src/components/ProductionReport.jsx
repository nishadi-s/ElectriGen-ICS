import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductionDetails from "../components/ProductionDetails";
import jsPDF from "jspdf";

const ProductionReport = ({ production }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredProduction, setFilteredProduction] = useState(null);

  const handleGenerate = () => {
    // Filter production records based on the selected time period
    const filteredRecords = production.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        (!startDate || recordDate >= startDate) &&
        (!endDate || recordDate <= endDate)
      );
    });

    setFilteredProduction(filteredRecords);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const reportTitle = "Production Report";

    // Add report header
    doc.setFontSize(16);
    doc.text(reportTitle, doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });

    // Add table headers
    const tableHeaders = ["Date", "Products", "Materials"];
    const headerStartY = 20;
    doc.setFontSize(12);
    doc.table(tableHeaders, {
      startY: headerStartY,
      margin: { left: 10, right: 10 },
      autoWidth: true,
      styles: {
        header: {
          fontSize: 10,
          fillColor: "#f0f0f0",
          textColor: "#000",
          halign: "center",
          valign: "middle",
        },
      },
    });

    // Add table data
    const data = filteredProduction.map((record) => [
      record.date,
      record.products,
      record.materials,
    ]);
    const startY = headerStartY + doc.lastAutoTable.finalY + 5;
    doc.table(data, {
      startY,
      margin: { left: 10, right: 10 },
      autoWidth: true,
    });

    // Save the PDF
    doc.save("production_report.pdf");
  };
  return (
    <div>
      <h2>Select Time Period</h2>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <button onClick={handleGenerate}>
        Show production records for this time period
      </button>
      {filteredProduction && (
        <div>
          {filteredProduction.map((record) => (
            <ProductionDetails key={record._id} production={record} />
          ))}
          <button onClick={handleDownloadPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
};

export default ProductionReport;
