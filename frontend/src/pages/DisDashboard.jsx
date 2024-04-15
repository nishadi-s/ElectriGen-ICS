import React from "react";
import NavbarDini1 from "../components/DisNavbar";

const DisDashboard = () => {
  const distributor = JSON.parse(localStorage.getItem('distributor'));
  const distributorEmail = distributor ? distributor.email : '';

  return (
    <NavbarDini1>
      <div>
        <h1>Dashboard page</h1>
        <p>Distributor Email: {distributorEmail}</p>
      </div>
    </NavbarDini1>
  );
};

export default DisDashboard;