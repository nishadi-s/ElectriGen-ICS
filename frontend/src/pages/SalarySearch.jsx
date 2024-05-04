import React from "react";
import SalarySearch from "../components/SalarySearch"; // Import the SalarySearch component

const SalarySearchPage = () => {
  // You may fetch the salary data here and pass it as props to the SalarySearch component
  const salaries = []; // Assuming you have fetched the salaries

  return (
    <div className="salary-search-page">
      <h1>Salary Search</h1>
      {/* Render the SalarySearch component and pass the salaries data as props */}
      <SalarySearch salary={salaries} />
    </div>
  );
};

export default SalarySearchPage;