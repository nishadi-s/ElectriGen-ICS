import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import ProductionNavbar from "../components/ProductionNavbar";

const ProductionAnalytics = () => {
  const [productionRecords, setProductionRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyProductCounts, setMonthlyProductCounts] = useState([]);

  useEffect(() => {
    fetchProductionRecords();
  }, []);

  const fetchProductionRecords = async () => {
    try {
      const response = await axios.get("/api/productions");
      setProductionRecords(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching production records:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth !== "") {
      const filtered = productionRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === parseInt(selectedMonth);
      });
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(productionRecords);
    }
  }, [selectedMonth, productionRecords]);

  useEffect(() => {
    // Calculate the total number of products produced for each month
    const monthlyCounts = Array(12).fill(0);
    productionRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      const monthIndex = recordDate.getMonth();
      monthlyCounts[monthIndex] += record.quantity;
    });
    setMonthlyProductCounts(monthlyCounts);
  }, [productionRecords]);

  const countProductsByDay = () => {
    const counts = Array(31).fill(0);
    filteredRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      const dayOfMonth = recordDate.getDate();
      counts[dayOfMonth - 1] += record.quantity;
    });
    return counts;
  };

  const data = countProductsByDay().map((count, index) => ({
    day: index + 1,
    productsManufactured: count,
  }));

  const monthlyData = monthlyProductCounts.map((count, index) => ({
    month: getMonthName(index),
    productsManufactured: count,
  }));

  return (
    <ProductionNavbar>
      <div>
        <Typography variant="h3" component="h2" gutterBottom>
          Production Analytics
        </Typography>
        <div className="action-buttons">
          <div style={{ marginLeft: "20px" }}>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              displayEmpty
              style={{ width: "200px" }}
            >
              <MenuItem value="" disabled>
                Please select a month
              </MenuItem>
              {[...Array(12).keys()].map((index) => (
                <MenuItem key={index} value={index}>
                  {getMonthName(index)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : selectedMonth !== "" ? (
          <>
            <Card variant="outlined" style={{ marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Production Count for Selected Month
                </Typography>
                <Divider />
                <BarChart width={600} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="productsManufactured" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
            <Card variant="outlined" style={{ marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Total Products Manufactured for Each Month
                </Typography>
                <Divider />
                <BarChart width={600} height={300} data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="productsManufactured" fill="#82ca9d" />
                </BarChart>
              </CardContent>
            </Card>
          </>
        ) : (
          <Typography>Please select a month to view analytics.</Typography>
        )}
      </div>
    </ProductionNavbar>
  );
};

const getMonthName = (monthIndex) => {
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
  return months[monthIndex];
};

export default ProductionAnalytics;
