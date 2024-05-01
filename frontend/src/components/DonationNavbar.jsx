import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShapes,
  FaIndustry,
  FaDollyFlatbed,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DonationNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
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

    //{
    //   path: "/products",
    //    name: "Products",
    //    icon: <FaDollyFlatbed />,
    //},

    //{
    //  path: "/Materials",
    //  name: "Materials",
    //  icon: <FaShapes />,
    //},

    //{
    //  path: "/Production",
    //  name: "Production",
    //  icon: <FaIndustry />,
    //},

    {
      path: "/doner_analytics",  
      name: "Analytics and Report",
      icon: <FaRegChartBar />,
    },
    {
      path: "/MyProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
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

export default DonationNavbar;
