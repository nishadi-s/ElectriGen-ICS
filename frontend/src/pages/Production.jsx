import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../senith.css";
import ProductionDetails from "../components/ProductionDetails";
import { useProductionContext } from "../hooks/useProductionContext";
import ProductionNavbar from "../components/ProductionNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf"; // Import jsPDF library
import "jspdf-autotable";
import { format } from "date-fns";
import { FaRegTrashCan } from "react-icons/fa";

const Production = () => {
  const { production, dispatch } = useProductionContext();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredProduction, setFilteredProduction] = useState(production); // Initialize with all production records

  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const response = await fetch("/api/productions");
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_PRODUCTION", payload: json });
          setFilteredProduction(json); // Update filteredProduction with all production records
        } else {
          console.error("Failed to fetch production data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    };

    fetchProduction();
  }, [dispatch]);

  const handleFilter = () => {
    // Filter production records based on the selected time period
    const filteredRecords = production.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        (!startDate || recordDate >= startDate) &&
        (!endDate || recordDate <= endDate)
      );
    });

    setFilteredProduction(filteredRecords); // Update filteredProduction with filtered records
  };

  const handleDownloadPDF = () => {
    if (filteredProduction) {
      const currentDate = new Date();
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
      const fileName = `production_report_${formattedCurrentDate}.pdf`;

      const doc = new jsPDF();

      // Add logo
      const logoImg = new Image();
      logoImg.onload = function () {
        const logoWidth = 50; // Set the desired width of the logo
        const logoHeight = (logoImg.height * logoWidth) / logoImg.width; // Calculate the height based on the aspect ratio

        const logoX = (doc.internal.pageSize.width - logoWidth) / 2;
        doc.addImage(logoImg, "PNG", logoX, 10, logoWidth, logoHeight);

        const formattedStartDate = startDate
          ? format(startDate, "MM/dd/yyyy")
          : "N/A";
        const formattedEndDate = endDate
          ? format(endDate, "MM/dd/yyyy")
          : "N/A";
        const reportTitle = `Divolca Electric Production Report`;
        const subtitle = `(${formattedStartDate} - ${formattedEndDate})`;

        const titleWidth =
          (doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        const subtitleWidth =
          (doc.getStringUnitWidth(subtitle) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;

        const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
        const subtitleX = (doc.internal.pageSize.width - subtitleWidth) / 2;

        // Add title and subtitle
        doc.setFontSize(20);
        doc.text(reportTitle, titleX, 40);
        doc.setFontSize(14);
        doc.text(subtitle, subtitleX, 50);

        // Add footer
        const footerText =
          "Divolca Electric Pvt. LTD, 296 Sir Ratnajothi Saravanamuttu Mawatha, Colombo 13";
        const footerWidth =
          (doc.getStringUnitWidth(footerText) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        const footerX = (doc.internal.pageSize.width - footerWidth) / 2;
        doc.setFontSize(10);
        doc.text(footerText, footerX, doc.internal.pageSize.height - 10);

        // Add current date
        doc.setFontSize(10);
        doc.text(`Date: ${formattedCurrentDate}`, 70, 70);

        // Add table
        doc.autoTable({
          head: [["Date", "Materials", "Products"]],
          body: filteredProduction.map((record) => [
            format(new Date(record.date), "MM/dd/yyyy"),
            record.materials
              .map((m) => `${m.materialName} - ${m.materialQuantity}`)
              .join("\n"),
            record.products.map((p) => `${p.name} - ${p.quantity}`).join("\n"),
          ]),
          startY: 90, // Adjust the vertical position of the table
        });

        doc.save(fileName);
      };

      logoImg.src = "header.png";
    }
  };

  return (
    <ProductionNavbar>
      <div className="home">
        <div className="products">
          <div className="production-header">
            <h1>Production Records</h1>
          </div>
          <div>
            <h2>Select Time Period</h2>
            <div className="date-picker-container">
              <div className="date-picker-wrapper">
                <label>Start Date:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div className="date-picker-wrapper">
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
            </div>
            <button className="button-5" onClick={handleFilter}>
              Show production records for this time period
            </button>
          </div>

          <table>
            <thead className="table-header">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Products</th>
                <th scope="col">Materials</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduction &&
                filteredProduction.map((prod) => (
                  <ProductionDetails key={prod._id} production={prod} />
                ))}
            </tbody>
          </table>
          <Link to="/AddProduction" className="edit-link">
            <button className="button-5">Add a new Record</button>
          </Link>
          <button onClick={handleDownloadPDF} className="button-5">
            Download as PDF
          </button>
        </div>
      </div>
    </ProductionNavbar>
  );
};

export default Production;
