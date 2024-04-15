import React from "react";
import { Link } from "react-router-dom";
 
const Home = () => {
  return (
    <div>
      <Link to="/ProductionDashboard" className="edit-link">
        <button>Production</button>
      </Link>
      <Link to="/DistributorDashboard" className="edit-link">
        <button>Distributors</button>{" "}
      </Link>
 
      <Link to="/SalesDashboard" className="edit-link">
        <button>Showroom</button>{" "}
      </Link>
 
      <Link to="/Donation_Dashboard" className="edit-link">
        <button>Donation</button>{" "}
      </Link>
 
      <Link to="/SalaryDashboard" className="edit-link">
        <button>Salary</button>{" "}
      </Link>
 
      <Link to="/ExportsDashboard" className="edit-link">
        <button>Exports</button>{" "}
      </Link>
 
      <Link to="/SupplierOrderDashboard" className="edit-link">
        <button>Suppliers</button>{" "}
      </Link>
    </div>
  );
};
 
export default Home;