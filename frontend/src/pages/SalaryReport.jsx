import React, { useEffect } from "react";
import { Typography } from "@mui/material"; // Import Typography from Material-UI
import { useSalaryContext } from "../hooks/useSalaryContext";
import SalaryDetails from "../components/SalaryPdf";
import NavbarPay from "../components/Navbar-uvi";

const SalaryReportPage = () => {
  const { salaries, dispatch } = useSalaryContext();

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await fetch("/api/salaries");
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_SALARIES", payload: json });
        } else {
          throw new Error("Failed to fetch salaries");
        }
      } catch (error) {
        console.error("Error fetching salaries:", error);
      }
    };

    fetchSalaries();
  }, [dispatch]);

  return (
    <div className="salary-details-page">
      <NavbarPay>
      <Typography variant="h5" style={{
      textAlign: 'left',
      width: '100vw',
      padding: '17px 20px',
      backgroundColor: '#233066',
      color: '#fff',
      fontSize: '2.5rem',
      marginBottom: '30px',
      marginTop: '-20px',
      marginLeft: '-20px',
      borderRadius: '0px 10px 0px 10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
     User Report
    </Typography>
        {salaries && ( // Check if salaries is not null or undefined
          salaries.map((salary) => (
            <SalaryDetails salary={salary} key={salary._id} />
          ))
        )}
      </NavbarPay>
    </div>
  );
};

export default SalaryReportPage;
