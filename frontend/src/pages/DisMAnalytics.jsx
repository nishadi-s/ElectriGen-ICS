import React from "react";
import NavbarDini2 from "../components/DisMNavbar";
import ReportGeneration from '../components/DisMReport'

const DisMAnalytics = () => {
  return (
    <NavbarDini2>
      <h1>Distribution Reports</h1>
    <div className="box">
      <ReportGeneration/>
    </div>
    </NavbarDini2>
  );
};

export default DisMAnalytics;
