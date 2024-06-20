import React from "react";
import NavbarDini2 from "../components/DisMNavbar";
import DisMLatestOrder from '../components/DisMLatestOrder'
import DisMItemsSummary from '../components/DisMItemSummary'

const DisMDashboard = () => {

  return (
    <NavbarDini2>
      <div>
        <h1>Dashboard</h1>
      </div>
      <DisMItemsSummary/>
      <DisMLatestOrder/>
    </NavbarDini2>
  );
};

export default DisMDashboard;
