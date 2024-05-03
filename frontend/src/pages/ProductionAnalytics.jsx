import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Table, Button, Dropdown } from "react-bootstrap";
import ProductionNavbar from "../components/ProductionNavbar";

const ProductionAnalytics = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthFilter, setMonthFilter] = useState(null);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/production/display");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData); // Initially set filtered data to all records
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const monthName = monthFilter ? getMonthName(monthFilter) : ""; // Get the month name if filter is applied

    // Add the heading to the PDF
    doc.text(`Production Report for ${monthName}`, 10, 10);
    doc.text("", 15, 25); // Empty line for spacing

    // Generate the table
    doc.autoTable({
      head: [
        [
          "Date",
          "Material Name",
          "Material Quantity",
          "Product Name",
          "Product Quantity",
        ],
      ],
      body: filteredData.flatMap((item) =>
        item.materials.map((material, index) => [
          index === 0 ? item.date : "", // Show date only for the first material in each group
          material.name,
          material.quantity,
          item.products[index] ? item.products[index].name : "", // Show product name if available
          item.products[index] ? item.products[index].quantity : "", // Show product quantity if available
        ])
      ),
      styles: {
        lineColor: [100, 100, 100],
        lineWidth: 0.5,
        cellPadding: 5,
        cellBorder: "bottom",
      },
      didDrawCell: (data) => {
        // Adjust cell height for merged rows
        if (data.row.raw[0] === "") {
          data.cell.height = 0;
        }
      },
    });
    doc.save("ProductionReport.pdf");
  };

  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1]; // Month is zero-based in JavaScript Date objects
  };

  return (
    <ProductionNavbar>
      <div>
        <h1 className="mb-4">Production Report Generator</h1>
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="info" id="dropdown-month">
            {monthFilter ? `Filter by Month: ${monthFilter}` : "Select Month"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setMonthFilter(null)}>
              All Months
            </Dropdown.Item>
            {[...Array(12).keys()].map((month) => (
              <Dropdown.Item
                key={month}
                onClick={() => setMonthFilter(month + 1)}
              >
                {getMonthName(month + 1)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="success" className="mb-3" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Material Name</th>
              <th>Material Quantity</th>
              <th>Product Name</th>
              <th>Product Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) =>
              item.materials.map((material, index) => (
                <tr
                  key={`${item.date}-${index}`}
                  className={index === 0 ? "border-bottom" : ""}
                >
                  {index === 0 ? (
                    <td rowSpan={item.materials.length}>{item.date}</td>
                  ) : null}
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>
                    {item.products[index] ? item.products[index].name : ""}
                  </td>
                  <td>
                    {item.products[index] ? item.products[index].quantity : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </ProductionNavbar>
  );
};

export default ProductionAnalytics;
