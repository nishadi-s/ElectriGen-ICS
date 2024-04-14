import React, { useEffect, useState } from "react";
import SalaryDetails from "../components/SalaryDetails";

const SalaryDetailsPage = ({ salaryId }) => {
  const [salary, setSalary] = useState(null);

  useEffect(() => {
    console.log("Fetching salary details for salaryId:", salaryId); // Log the salaryId
    const fetchSalaryDetails = async () => {
      try {
        const response = await fetch(`/api/salaries/${salaryId}`);
        const data = await response.json();
        setSalary(data);
      } catch (error) {
        console.error('Error fetching salary details:', error);
      }
    };

    fetchSalaryDetails();
  }, [salaryId]);

  console.log("Current salary:", salary); // Log the current salary state

  return (
    <div>
      {salary ? (
        <SalaryDetails salary={salary} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SalaryDetailsPage;
