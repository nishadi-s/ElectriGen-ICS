import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaShapes, FaIndustry, FaDollyFlatbed, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate hook
import '../disNavbar.css'

const NavbarDini2 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/DisMDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/DisMOrderHistory",
      name: "Distributor Orders",
      icon: <FaShapes />,
    },
    {
      path: "/DisMAnalytics",
      name: "Distribution Reports",
      icon: <FaRegChartBar />,
    },
    {
      path: "/DisMAnalytics2",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/DisMMyProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/Logout", // Logout route
      name: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className="container">
    <div style={{ width: isOpen ? "350px" : "50px" }} className="sidebar">
      <div className="top_section">
        <img
          src="logo1.png"
          style={{ display: isOpen ? "block" : "none" }}
          className="logo"
          width="220"
          height="42"
          alt="Company Logo"
        ></img>
        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
          <FaBars onClick={toggle} />
        </div>
      </div>
      {menuItem.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className="link"
          activeclassName="active"
        >
          <div className="icon">{item.icon}</div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            {item.name}
          </div>
        </NavLink>
      ))}
    </div>
    <main>{children}</main>{" "}
  </div>
);
};

export default NavbarDini2;
