import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaKeyboard,
  FaKey,
  FaHandHoldingHeart,
  FaReplyAll,
  FaFileContract,
  FaRegChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    navigate("/new-login");
  };
  const menuItem = [
    {
      path: "/SalesDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/invoiceCreate",
      name: "Create Invoice",
      icon: <FaKeyboard />,
    },
    {
      path: "/SDView",
      name: "Modify Invoice",
      icon: <FaKey />,
    },
    {
      path: "/SDFeedback",
      name: "Sales Feadback",
      icon: <FaHandHoldingHeart />,
    },
    {
      path: "/InvoiceReport",
      name: "Report Handling",
      icon: <FaFileContract />,
    },
    {
      path: "/SalesAna",
      name: "Sales Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/salesProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },
    /* {
      path: "/Logout",
      name: "Logout",
      icon: <FaReplyAll />,
    },*/
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
        {/* Add logout menu item if user is authenticated */}
        {isAuthenticated && (
          <div
            className="link"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Logout
            </div>
          </div>
        )}
      </div>
      <main>{children}</main>{" "}
    </div>
  );
};

export default Navbar;
