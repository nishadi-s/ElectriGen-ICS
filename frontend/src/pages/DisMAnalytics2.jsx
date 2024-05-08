import React from "react";
import NavbarDini2 from "../components/DisMNavbar";
import DisMGraphs from "../components/DisMGraph"

const DisMAnalytics2 = () => {
  return (
    <NavbarDini2>
      <h1>Distribution Reports</h1>
    <div className="box">
      <DisMGraphs/>
    </div>
    </NavbarDini2>
  );
};

export default DisMAnalytics2;
