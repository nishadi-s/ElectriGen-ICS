import React from "react";
import bg001 from "../pages/img/bg001.jpg";
import logo1 from "../pages/img/logo1.png";
import Swal from "sweetalert2";

const Home = () => {
  const buttons = [
    {
      id: 1,
      text: "Supplier Management",
      password: "Sn123",
      link: "/SupplierOrderDashboard",
    },
    {
      id: 2,
      text: "Production Management",
      password: "Sp123",
      link: "/ProductionDashboard",
    },
    {
      id: 3,
      text: "Distributor Management",
      password: "Dd123",
      link: "/DisMDashboard",
    },
    {
      id: 4,
      text: "Expot Management",
      password: "Se123",
      link: "/ExportsDashboard",
    },
    { id: 5, text: "Employee Salary Management", password: "Us123", link: "#" },
    {
      id: 6,
      text: "Donation Project Management",
      password: "Dd000",
      link: "/Donation_Dashboard",
    },
    {
      id: 7,
      text: "Showroom Sales Management",
      password: "Ps123",
      link: "/SalesDashboard",
    },
        { id: 8, text: "Distributors", link: "/login" },

  ];

  const handleButtonClick = (password, link) => {
    return () => {
      Swal.fire({
        title: "Verify as the Manager",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Verify",
        confirmButtonColor: "#233066",
        cancelButtonColor: "#EC2026",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "Enter Correct PIN";
            window.location.href = "/Home.jsx";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const enteredPin = result.value;
          if (enteredPin === password) {
            console.log("PIN verified:", enteredPin);
            window.location.href = link; // Redirect to the target page
          } else {
            Swal.fire({
              title: "Incorrect PIN",
              icon: "error",
              text: "The entered PIN is incorrect. Please try again.",
            });
          }
        }
      });
    };
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${bg001})`,
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "absolute", top: 20 }}>
        <img
          src={logo1}
          className="logo"
          width="220"
          height="42"
          alt="Company Logo"
        />
      </div>
      <div className="row justify-content-center">
        {buttons.map((button) => (
          <div className="col-3" key={button.id}>
            <div
              className="card"
              style={{
                width: "18rem",
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                marginBottom: "20px",
              }}
            >
              <img
                src={getCardImage(button.text)}
                className="card-img-top"
                alt={button.text}
              />
              <div className="card-body">
                <h5 className="card-title">{button.text}</h5>
                <button
                  onClick={handleButtonClick(button.password, button.link)}
                  className="btn btn-primary"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to get the correct card image based on the text
const getCardImage = (text) => {
  switch (text) {
    case "Supplier Management":
      return require("../pages/img/material.jpg").default;
    case "Production Management":
      return require("../pages/img/production.jpg").default;
    case "Distributors":
      return require("../pages/img/dis.jpg").default;
    case "Expot Management":
      return require("../pages/img/exportM.jpg").default;
    case "Employee Salary Management":
      return require("../pages/img/salary.jpg").default;
    case "Donation Project Management":
      return require("../pages/img/don.jpg").default;
    case "Showroom Sales Management":
      return require("../pages/img/invoice.jpg").default;
    case "Distributor Management":
      return require("../pages/img/distributor.jpg").default;
    default:
      return null;
  }
};


export default Home;
