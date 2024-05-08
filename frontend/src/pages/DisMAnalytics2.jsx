import React from "react";
import NavbarDini2 from "../components/DisMNavbar";
import MonthlyAnalytics from "../components/DisMGraphs";

const DisMAnalytics2 = () => {
  return (
    <NavbarDini2>
      <h1>Distribution Reports</h1>
    <div className="box">
      <MonthlyAnalytics/>
    </div>
    </NavbarDini2>
  );
};

export default DisMAnalytics2;
