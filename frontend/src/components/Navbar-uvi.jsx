import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaReceipt, FaMoneyCheckAlt, FaRegChartBar, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar_Pay = ({ children }) => {
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
      path: "/add-salary",
      name: "Payroll Form",
      icon: <FaMoneyCheckAlt />,
    },
    {
      path: "/salary-details",
      name: "Payroll Management",
      icon: <FaReceipt />,
    },
    {
      path: "/salary-report",
      name: "Report",
      icon: <FaRegChartBar />,
    },
    {
      path: "/all-salary-report",
      name: "Summary Report",
      icon: <FaClipboardList />,
    },
    {
      path: "/user-dash",
      name: "User Dashboard",
      icon: <FaUserAlt />,
    },
    {
      path: "/new-signup",
      name: "Signup",
      icon: <FaUserAlt />,
    },
    {
      path: "/user-details",
      name: "User Details",
      icon: <FaUserAlt />,
    },
    {
      path: "/user-profile",
      name: "My Profile",
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
          />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
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
            <div className="icon"><FaSignOutAlt /></div>
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

export default Navbar_Pay;
/*import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaReceipt,FaMoneyCheckAlt,FaRegChartBar, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Navbar_Pay = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
   
    {
        path: "/add-salary",
        name: "Payroll Form",
        icon: <FaMoneyCheckAlt/>,
      },
     
    {
      path: "/salary-details",
      name: "Payroll Management",
      icon: <FaReceipt />,
    },
    {
      path: "/salary-report",
      name: "Report",
      icon: <FaRegChartBar />,
    },
    {
      path: "/all-salary-report",
      name: "Summary Report",
      icon: < FaClipboardList />,
    },
    {
      path: "/new-signup",
      name: "Signup",
      icon: <FaUserAlt />,
    },
    {
      path: "/user-details",
      name: "User Details",
      icon: <FaUserAlt />,
    },
   
  
    {
      path: "/my-profile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/logout",
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
          />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
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

export default Navbar_Pay;*/
