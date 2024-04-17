import React from "react";
import NavbarDini1 from "../components/DisNavbar";
import LatestOrder from '../components/DisLatestOrder'
import ItemsSummary from '../components/DisItemSummary'

const DisDashboard = () => {
  const distributor = JSON.parse(localStorage.getItem('distributor'));
  const distributorEmail = distributor ? distributor.email : '';

  return (
    <NavbarDini1>
      <div>
        <h1>Dashboard</h1>
        <p>Distributor Email: {distributorEmail}</p>
      </div>
      <ItemsSummary/>
      <LatestOrder/>
    </NavbarDini1>
  );
};

export default DisDashboard;