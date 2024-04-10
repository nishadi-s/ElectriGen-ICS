import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShapes,
  FaIndustry,
  FaDollyFlatbed,
  FaIdBadge,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/Donation_Dashboard",
      name: "Donation Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/Dashboard",
      name: "Sales Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/ExportsDashboard",
      name: "Exports Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/OrderForm",
      name: "Order Placement",
      icon: <FaDollyFlatbed />,
    },

    {
      path: "/OrderHistory",
      name: "Order History",
      icon: <FaShapes />,
    },

    {
      path: "/Products",
      name: "Products",
      icon: <FaDollyFlatbed />,
    },
    {
      path: "/Production",
      name: "Production",
      icon: <FaIndustry />,
    },

    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },

    {
      path: "/Importer",
      name: "Importer",
      icon: <FaIdBadge />,
    },
    {
      path: "/ExportOrders",
      name: "Export Orders",
      icon: <FaDollyFlatbed />,
    },
    {
      path: "/ImporterDescription",
      name: "Importer Details",
      icon: <FaThList />,
    },
    {
      path: "/ExportAnalytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/ExportsProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },

    {
      path: "/New_Projects",
      name: "New Projects",
      icon: <FaDollyFlatbed />,
    },

    {
      path: "/Doner_Feedback",
      name: "Doner Feedback",
      icon: <FaShapes />,
    },
    {
      path: "/doner_analytics",
      name: "Analytics and Report",
      icon: <FaRegChartBar />,
    },

    {
      path: "/Logout",
      name: "Logout",
      icon: <FaUserAlt />,
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

export default Navbar;
