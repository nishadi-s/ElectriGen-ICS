import React from "react";
import NavbarDini1 from "../components/DisNavbar";
import '../DistributionFun.css';

const DisMyProfile = () => {
  const distributor = JSON.parse(localStorage.getItem('distributor'));
  const distributorEmail = distributor ? distributor.email : '';

  return (
    <NavbarDini1>
    <div>
      <h1>My profile</h1>
      <p>Distributor Email: {distributorEmail}</p>
    </div>
    </NavbarDini1>
  );
};

export default DisMyProfile;