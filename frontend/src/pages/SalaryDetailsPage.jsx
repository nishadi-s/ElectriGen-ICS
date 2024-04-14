import React, { useEffect } from "react";
import { useSalaryContext } from "../hooks/useSalaryContext";
import SalaryDetails from "../components/SalaryDetails";

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
      {salaries &&
        salaries.map((salary) => (
          <SalaryDetails salary={salary} key={salary._id} />
        ))}
    </div>
  );
};

export default SalaryDetailsPage;
