import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaShapes, FaIndustry, FaDollyFlatbed, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useDisLogout } from '../hooks/useDisLogout'; // Import useDisLogout
import '../disNavbar.css'

const NavbarDini1 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { disLogout } = useDisLogout(); // Initialize useDisLogout hook
  const navigate = useNavigate(); // Initialize useNavigate hook

  const menuItem = [
    {
      path: "/DisDashboard",
      name: "Dashboard",
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
      path: "/login", // Logout route
      name: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  const handleLogout = () => {
    disLogout(); // Call logout function
    navigate('/login'); // Navigate to the login page
  };

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
            onClick={item.path === '/login' ? handleLogout : undefined} // Handle logout click
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

export default NavbarDini1;
