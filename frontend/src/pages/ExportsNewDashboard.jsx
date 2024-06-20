import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import axios from "axios";
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import "../exports.css";

const ExportDashboard = () => {
  const [exports, setExports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalImporters, setTotalImporters] = useState(0);

  useEffect(() => {
    fetchExports();
    fetchImporters();
  }, []);

  const fetchExports = async () => {
    try {
      const response = await axios.get("/api/export");
      setExports(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching export orders:", error);
    }
  };

  const fetchImporters = async () => {
    try {
      const response = await axios.get("/api/Importer");
      setTotalImporters(response.data.length);
    } catch (error) {
      console.error("Error fetching importers:", error);
    }
  };

  const getTotalExportsByMonth = () => {
    const totalExportsByMonth = Array(12).fill(0);
    exports.forEach((exportOrder) => {
      const exportDate = new Date(exportOrder.createdAt);
      const month = exportDate.getMonth();
      totalExportsByMonth[month]++;
    });
    return totalExportsByMonth;
  };

  const totalExportsByMonth = getTotalExportsByMonth();

  const months = [
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

  const gridColors = [
    "#B9CCEC",
    "#B9E8D8",
    "#FCD8B0",
    "#FFB3B3",
    "#D4B3FF",
    "#B9FFD1",
    "#FFCC99",
    "#FFC2A3",
    "#FFE6CC",
    "#FFC2A3",
    "#FFE6CC",
    "#FFC2A3",
  ];

  const monthsWithExports = totalExportsByMonth
    .map((count, index) => ({ month: months[index], count }))
    .filter((item) => item.count > 0);

  const totalExportsForYear = exports.length;

  return (
    <div className="ex-new-dashboard with-background">
      <ExportsNavBar>
        <div>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#000000",
            }}
          >
            EXPORTS DASHBOARD
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <div>
              <Card
                variant="outlined"
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#1976D2",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    gutterBottom
                    style={{ textAlign: "center", color: "#ffffff" }}
                  >
                    Total Exports for the Year
                  </Typography>
                  <Divider />
                  <Typography
                    style={{
                      fontSize: "1.5em",
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    {totalExportsForYear}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#1976D2",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    gutterBottom
                    style={{ textAlign: "center", color: "#ffffff" }}
                  >
                    Total Importers
                  </Typography>
                  <Divider />
                  <Typography
                    style={{
                      fontSize: "1.5em",
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    {totalImporters}
                  </Typography>
                </CardContent>
              </Card>
              <div className="card-container">
                {monthsWithExports.map(({ month, count }, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <CardContent className="card-content">
                      <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        className="card-title"
                      >
                        {month}
                      </Typography>
                      <Divider className="card-divider" />
                      <Typography
                        style={{
                          fontSize: "1.2em",
                          textAlign: "center",
                          marginTop: "10px",
                        }}
                        className="card-text"
                      >
                        Total Exports: {count}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </ExportsNavBar>
    </div>
  );
};

export default ExportDashboard;
