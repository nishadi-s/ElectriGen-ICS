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
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { Button } from '@mui/material'; // Add this import

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/SalaryDetailsPage",
      name: "Payroll Management",
      icon: <FaShapes />,
    },
    {
      path: "/",
      name: "Payroll Form",
      icon: <FaIndustry />,
    },
    {
      path: "/analytics",
      name: "Analytics",
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
        {user && (
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            <div className="icon">
              <FaUserAlt />
            </div>
            <div className="link_text">{user.email}</div>
          </div>
        )}
        {user ? (
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            <div className="icon">
              <FaUserAlt />
            </div>
            <div className="link_text">
              <Button onClick={logout} color="inherit">Log out</Button>
            </div>
          </div>
        ) : (
          <NavLink
            to="/Login"
            key="login"
            className="link"
            activeclassName="active"
          >
            <div className="icon">
              <FaUserAlt />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Login
            </div>
          </NavLink>
        )}
      </div>
      <main>{children}</main>{" "}
    </div>
  );
};

export default Navbar;
