import React from "react";
import NavbarDini1 from "../components/DisNavbar";
import LatestOrder from '../components/DisLatestOrder'
import ItemsSummary from '../components/DisItemSummary'

const DisDashboard = () => {
  const distributor = JSON.parse(localStorage.getItem('distributor'));
  const distributorLoginID = distributor ? distributor.distributorLoginID : '';

  //greeting message for distributors
  const getGreeting = () => {
    const currentTime = new Date().getHours();
    let greeting = '';

    if (currentTime < 12) {
      greeting = 'Good morning';
    } else if (currentTime >= 12 && currentTime < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    return greeting;
  };

  return (
    <NavbarDini1>
      <div>
        <h1>Dashboard</h1>
        <div>
        <p>{getGreeting()} Dear Customer</p>
        <p>Distributor ID: {distributorLoginID}</p>
        </div>
      </div>
      <ItemsSummary/>
      <LatestOrder/>
    </NavbarDini1>
  );
};

export default DisDashboard;