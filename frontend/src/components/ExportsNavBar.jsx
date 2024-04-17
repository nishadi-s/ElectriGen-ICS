import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
 // FaRegChartBar,
  FaDollyFlatbed,
  FaThList,
  FaIdBadge,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ExportsNavBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/ExportsDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/ImporterDescription",
      name: "Importer Details",
      icon: <FaThList />,
    },
    {
      path: "/ExportOrders",
      name: "Export Orders",
      icon: <FaDollyFlatbed />,
    },
    {
      path: "/Importer",
      name: "Importers",
      icon: <FaIdBadge />,
    },
    // {
    //   path: "/ExportAnalytics",
    //   name: "Analytics",
    //   icon: <FaRegChartBar />,
    // },
    {
      path: "/ExportsProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },

    // {
    //   path: "/MyProfile",
    //   name: "Logout",
    //   icon: <FaUserAlt />,
    // },
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
            activelassname="active"
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

export default ExportsNavBar;
