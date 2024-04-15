import React, { useEffect } from "react";
import { Typography } from "@mui/material"; // Import Typography from Material-UI
import { useSalaryContext } from "../hooks/useSalaryContext";
import SalaryDetails from "../components/SalaryDetails";
import Navbar_Pay from "../components/Navbar-uvi";

const SalaryDetailsPage = () => {
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
      <Navbar_Pay >
      <Typography variant="h3" gutterBottom>
        Manager Payment Details
      </Typography>
      {salaries &&
        salaries.map((salary) => (
          <SalaryDetails salary={salary} key={salary._id} />
        ))}
       </Navbar_Pay>
    </div>
  );
};

export default SalaryDetailsPage;
