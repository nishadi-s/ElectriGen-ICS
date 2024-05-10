import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShippingFast,
  FaPeopleArrows,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavbarNishadi = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //logout logic
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    navigate("/new-login");
  };

  const menuItem = [
    /*{
      path: "/Home",
      name: "Supplier Order Dashboard",
      
    },*/

    {
      path: "/SupplierOrderDashboard",
      name: "Supplier Order Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/Suppliers",
      name: "Suppliers",
      icon: <FaPeopleArrows />,
    },
    {
      path: "/Order",
      name: "Orders",
      icon: <FaShippingFast />,
    },

    {
      path: "/analyticsN",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/SupplierEmail",
      name: "Email",
      icon: <FaEnvelope />,
    },
    {
      path: "/supplierProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },

    /* {
      path: "/LogoutProfile",
      name: "Logout",
      icon: <FaUserAlt />,
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
            activeclassname="active"
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

export default NavbarNishadi;
