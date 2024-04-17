import React, { useState } from "react";
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

export default Navbar_Pay;
