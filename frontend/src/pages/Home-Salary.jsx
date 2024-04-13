import { useEffect } from "react";
import { useSalaryContext } from "../hooks/useSalaryContext";

// components
import SalaryDetails from "../components/SalaryDetails";
import SalaryForm from "../components/SalaryForm";

const Home = () => {
  const { salaries, dispatch } = useSalaryContext();

  useEffect(() => {
    const fetchSalaries = async () => {
      const response = await fetch('/api/salaries');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_SALARIES', payload: json });
      }
    };

    fetchSalaries();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="salaries">
        {salaries && salaries.map(salary => (
          <SalaryDetails salary={salary} key={salary._id} />
        ))}
      </div>
      <SalaryForm />
    </div>
  );
};

export default Home;
