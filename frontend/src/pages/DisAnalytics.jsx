import React from "react";
import NavbarDini1 from "../components/DisNavbar";
import ReportGeneration from '../components/DisReport'

const DisAnalytics = () => {
  return (
    <NavbarDini1>
      <h1>Reports And Analytics</h1>
    <div className="box">
      <ReportGeneration/>
    </div>
    </NavbarDini1>
  );
};

export default DisAnalytics;