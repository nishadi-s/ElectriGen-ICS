import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const ReportPopup = ({ onClose, onGenerateReport }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const handleGenerateReport = () => {
    // Call the onGenerateReport function with the selected date range
    onGenerateReport(dateRange[0]);
    // Close the popup
    onClose();
  };

  return (
    <div className="report-popup">
      <DateRangePicker
        ranges={dateRange}
        onChange={(ranges) => setDateRange([ranges.selection])}
      />
      <button onClick={handleGenerateReport}>Generate Report</button>
    </div>
  );
};

export default ReportPopup;
