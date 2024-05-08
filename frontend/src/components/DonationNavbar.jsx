import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShapes,
  FaSignOutAlt,
  FaDollyFlatbed,
  FaSignLanguage,
  FaBookOpen,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DonationNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/Donation_Dashboard",
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
        icon: <FaSignLanguage />,
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
      path: "/DReportCreate",  
      name: "Analytics and Report",
      icon: <FaRegChartBar />,
    },

    {
      path: "/DProjectDetails",  
      name: "View Past Projects",
      icon: <FaBookOpen />,
    },

    {
      path: "/dFeedbackFetch",  
      name: "View Feedbacks",
      icon: <FaHandHoldingHeart />,
    },
    {
      path: "/MyProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },

    {
      path: "/",
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

export default DonationNavbar;
